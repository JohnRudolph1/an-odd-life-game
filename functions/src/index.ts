import * as admin from 'firebase-admin';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

type AuthCtx = { auth?: { uid: string; token: Record<string, unknown> } };
const assertAuth = (req: AuthCtx) => { if (!req.auth?.uid) throw new HttpsError('unauthenticated', 'Login required'); return req.auth.uid; };
const isAdmin = async (uid: string) => (await db.doc(`users/${uid}`).get()).data()?.role === 'admin';

const seatRef = (flightId: string, seatId: string) => db.doc(`flights/${flightId}/seats/${seatId}`);
const assignmentRef = (flightId: string, uid: string) => db.doc(`flights/${flightId}/assignments/${uid}`);

export const listMyFlights = onCall(async (req) => {
  const uid = assertAuth(req);
  const links = await db.collection(`users/${uid}/myFlights`).get();
  const flights = await Promise.all(links.docs.map(async (d) => ({ id: d.id, ...(await db.doc(`flights/${d.id}`).get()).data() })));
  return flights;
});

export const searchFlightAndUpsert = onCall(async (req) => {
  const uid = assertAuth(req);
  const { airlineIata, flightNumber, departureDate } = req.data as { airlineIata: string; flightNumber: string; departureDate: string };
  const flightId = `${airlineIata}-${flightNumber}-${departureDate}`.toLowerCase();
  const ref = db.doc(`flights/${flightId}`);

  let payload: any;
  try {
    const res = await axios.get(`${process.env.AVIATIONSTACK_BASE_URL ?? 'http://api.aviationstack.com/v1'}/flights`, {
      params: { access_key: process.env.AVIATIONSTACK_API_KEY, flight_iata: `${airlineIata}${flightNumber}` }
    });
    const first = res.data?.data?.[0];
    if (!first) throw new Error('No flight found');
    payload = {
      provider: 'aviationstack', airlineIata, flightNumber, departureDate,
      originIata: first.departure?.iata ?? 'UNK', destinationIata: first.arrival?.iata ?? 'UNK',
      scheduledDepartureAt: first.departure?.scheduled ?? '', scheduledArrivalAt: first.arrival?.scheduled ?? '',
      aircraft: first.aircraft?.registration ?? 'Unknown', seatMapTemplateId: 'single-aisle-default', updatedAt: admin.firestore.FieldValue.serverTimestamp(), createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await ref.set(payload, { merge: true });
  } catch {
    const cached = await ref.get();
    if (!cached.exists) throw new HttpsError('resource-exhausted', 'API unavailable and no cache entry');
    payload = cached.data();
  }

  await db.doc(`users/${uid}/myFlights/${flightId}`).set({ createdAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  return { id: flightId, ...payload };
});

export const createSeatMapTemplate = onCall(async (req) => {
  const uid = assertAuth(req);
  if (!(await isAdmin(uid))) throw new HttpsError('permission-denied', 'Admin only');
  const { templateId, rows, cols } = req.data;
  await db.doc(`seatMapTemplates/${templateId}`).set({ templateId, rows, cols, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  return { ok: true };
});

export const createFlightManual = onCall(async (req) => {
  const uid = assertAuth(req);
  if (!(await isAdmin(uid))) throw new HttpsError('permission-denied', 'Admin only');
  const { flightId, ...rest } = req.data;
  await db.doc(`flights/${flightId}`).set({ ...rest, provider: 'manual', createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  return { ok: true };
});

export const generateSeatsForFlight = onCall(async (req) => {
  const uid = assertAuth(req);
  if (!(await isAdmin(uid))) throw new HttpsError('permission-denied', 'Admin only');
  const { flightId, templateId } = req.data;
  const template = (await db.doc(`seatMapTemplates/${templateId}`).get()).data();
  if (!template) throw new HttpsError('not-found', 'Template missing');
  const batch = db.batch();
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let row = 1; row <= template.rows; row++) {
    for (let col = 1; col <= template.cols; col++) {
      const seatId = `${row}${cols[col - 1]}`;
      batch.set(seatRef(flightId, seatId), { seatId, row, col, cabinClass: row < 5 ? 'business' : 'economy', attributes: [col === 1 || col === template.cols ? 'window' : 'aisle'], updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    }
  }
  await batch.commit();
  return { ok: true };
});

export const assignSeat = onCall(async (req) => {
  const uid = assertAuth(req);
  if (!(await isAdmin(uid))) throw new HttpsError('permission-denied', 'Admin only');
  const { flightId, targetUid, seatId } = req.data;
  await db.runTransaction(async (tx) => {
    const seat = await tx.get(seatRef(flightId, seatId));
    if (seat.data()?.occupantUid && seat.data()?.occupantUid !== targetUid) throw new HttpsError('failed-precondition', 'Seat occupied');
    tx.set(seatRef(flightId, seatId), { occupantUid: targetUid, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    tx.set(assignmentRef(flightId, targetUid), { uid: targetUid, seatId, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  });
  return { ok: true };
});

export const moveToEmptySeat = onCall(async (req) => {
  const uid = assertAuth(req);
  const { flightId, seatId } = req.data;
  await db.runTransaction(async (tx) => {
    const target = await tx.get(seatRef(flightId, seatId));
    if (target.data()?.occupantUid) throw new HttpsError('failed-precondition', 'Seat already occupied');
    const assignment = await tx.get(assignmentRef(flightId, uid));
    const fromSeat = assignment.data()?.seatId;
    if (fromSeat) tx.set(seatRef(flightId, fromSeat), { occupantUid: admin.firestore.FieldValue.delete() }, { merge: true });
    tx.set(seatRef(flightId, seatId), { occupantUid: uid, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    tx.set(assignmentRef(flightId, uid), { uid, seatId, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  });
  return { ok: true };
});

export const createSwapRequest = onCall(async (req) => {
  const uid = assertAuth(req);
  const { flightId, toUid } = req.data;
  const fromSeat = (await assignmentRef(flightId, uid).get()).data()?.seatId;
  const toSeat = (await assignmentRef(flightId, toUid).get()).data()?.seatId;
  const ref = db.collection(`flights/${flightId}/swapRequests`).doc();
  await ref.set({ fromUid: uid, toUid, fromSeatId: fromSeat, toSeatId: toSeat, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  return { requestId: ref.id };
});

export const respondToSwapRequest = onCall(async (req) => {
  const uid = assertAuth(req);
  const { flightId, requestId, action } = req.data;
  const ref = db.doc(`flights/${flightId}/swapRequests/${requestId}`);
  const snap = await ref.get();
  const data = snap.data();
  if (!data) throw new HttpsError('not-found', 'Request not found');
  if (data.toUid !== uid && data.fromUid !== uid) throw new HttpsError('permission-denied', 'Not part of request');
  const status = action === 'accept' ? 'accepted' : action === 'decline' ? 'declined' : 'canceled';
  await ref.set({ status, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  return { ok: true };
});

export const executeSwap = onCall(async (req) => {
  const uid = assertAuth(req);
  const { flightId, requestId } = req.data;
  const reqRef = db.doc(`flights/${flightId}/swapRequests/${requestId}`);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(reqRef);
    const r = snap.data();
    if (!r || r.status !== 'accepted') throw new HttpsError('failed-precondition', 'Request not accepted');
    if (uid !== r.fromUid && uid !== r.toUid) throw new HttpsError('permission-denied', 'Not allowed');

    const fromSeat = await tx.get(seatRef(flightId, r.fromSeatId));
    const toSeat = await tx.get(seatRef(flightId, r.toSeatId));
    if (fromSeat.data()?.occupantUid !== r.fromUid || toSeat.data()?.occupantUid !== r.toUid) throw new HttpsError('aborted', 'Stale state detected');

    tx.set(seatRef(flightId, r.fromSeatId), { occupantUid: r.toUid, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    tx.set(seatRef(flightId, r.toSeatId), { occupantUid: r.fromUid, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    tx.set(assignmentRef(flightId, r.fromUid), { uid: r.fromUid, seatId: r.toSeatId, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    tx.set(assignmentRef(flightId, r.toUid), { uid: r.toUid, seatId: r.fromSeatId, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    tx.set(reqRef, { status: 'completed', updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  });
  return { ok: true };
});
