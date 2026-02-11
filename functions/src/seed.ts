import * as admin from 'firebase-admin';

admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT ?? 'demo-seat-swap' });
const db = admin.firestore();

async function run() {
  const now = admin.firestore.FieldValue.serverTimestamp();
  await db.doc('users/admin').set({ displayName: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: now });
  await db.doc('users/demo1').set({ displayName: 'Demo One', email: 'demo1@example.com', role: 'passenger', createdAt: now });
  await db.doc('users/demo2').set({ displayName: 'Demo Two', email: 'demo2@example.com', role: 'passenger', createdAt: now });

  await db.doc('seatMapTemplates/single-aisle-default').set({ templateId: 'single-aisle-default', rows: 20, cols: 6, createdAt: now });

  const flightId = 'aa-100-2026-01-01';
  await db.doc(`flights/${flightId}`).set({
    provider: 'seed', airlineIata: 'AA', flightNumber: '100', departureDate: '2026-01-01',
    originIata: 'JFK', destinationIata: 'LAX', scheduledDepartureAt: '2026-01-01T13:00:00Z', scheduledArrivalAt: '2026-01-01T19:00:00Z', aircraft: 'A320', seatMapTemplateId: 'single-aisle-default', createdAt: now, updatedAt: now
  });

  const batch = db.batch();
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let row = 1; row <= 20; row++) {
    for (let col = 1; col <= 6; col++) {
      const seatId = `${row}${cols[col - 1]}`;
      batch.set(db.doc(`flights/${flightId}/seats/${seatId}`), { seatId, row, col, cabinClass: row < 4 ? 'business' : 'economy', attributes: [col === 1 || col === 6 ? 'window' : 'aisle'], updatedAt: now });
    }
  }
  batch.set(db.doc(`flights/${flightId}/seats/3A`), { occupantUid: 'demo1' }, { merge: true });
  batch.set(db.doc(`flights/${flightId}/seats/3B`), { occupantUid: 'demo2' }, { merge: true });
  batch.set(db.doc(`flights/${flightId}/assignments/demo1`), { uid: 'demo1', seatId: '3A', updatedAt: now });
  batch.set(db.doc(`flights/${flightId}/assignments/demo2`), { uid: 'demo2', seatId: '3B', updatedAt: now });
  batch.set(db.doc('users/demo1/myFlights/aa-100-2026-01-01'), { createdAt: now });
  batch.set(db.doc('users/demo2/myFlights/aa-100-2026-01-01'), { createdAt: now });
  await batch.commit();

  console.log('Seed complete');
}

run().catch((e) => { console.error(e); process.exit(1); });
