// FILE: server/utils/db.js
// Dependencies: Uses fs-extra for JSON persistence; consumed by vets routes for CRUD operations.

import { readJson, writeJson } from 'fs-extra/esm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, '../data/db.json');

async function readDb() {
  const data = await readJson(DB_PATH);
  data.vets ??= [];
  return data;
}

async function writeDb(data) {
  await writeJson(DB_PATH, data, { spaces: 2 });
}

export async function listVets() {
  const data = await readDb();
  return data.vets;
}

export async function getVetById(id) {
  const data = await readDb();
  return data.vets.find((vet) => vet.id === id) || null;
}

export async function upsertVet(vet) {
  const data = await readDb();
  const existingIndex = data.vets.findIndex((item) => item.id === vet.id);
  if (existingIndex >= 0) {
    data.vets[existingIndex] = vet;
  } else {
    vet.id = vet.id || uuid();
    data.vets.push(vet);
  }
  await writeDb(data);
  return vet;
}

export async function addServicePrice(vetId, payload) {
  const data = await readDb();
  let vet = data.vets.find((item) => item.id === vetId);
  if (!vet) {
    vet = {
      id: vetId,
      name: payload.name ?? 'Community submitted vet',
      address: payload.address ?? 'Unknown',
      phone: payload.phone,
      averageRating: 0,
      ratings: [],
      services: [],
      source: payload.source ?? 'community',
    };
    data.vets.push(vet);
  }
  vet.services = vet.services || [];
  vet.services.push({
    serviceName: payload.serviceName,
    price: payload.price,
    submittedAt: new Date().toISOString(),
  });
  await writeDb(data);
  return vet;
}

export async function addRating(vetId, rating) {
  const data = await readDb();
  const vet = data.vets.find((item) => item.id === vetId);
  if (!vet) {
    throw new Error('Vet not found');
  }
  vet.ratings = vet.ratings || [];
  vet.ratings.push({ rating: rating.rating, submittedAt: new Date().toISOString() });
  const average =
    vet.ratings.reduce((total, entry) => total + entry.rating, 0) / vet.ratings.length;
  vet.averageRating = Number.isFinite(average) ? Number(average.toFixed(2)) : 0;
  await writeDb(data);
  return vet;
}
