// FILE: server/routes/vets.js
// Dependencies: Express router using JSON file helpers; mounted in index.js under /api/vets.

import express from 'express';

import {
  addRating,
  addServicePrice,
  getVetById,
  listVets,
  upsertVet,
} from '../utils/db.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const vets = await listVets();
    res.json(vets);
  } catch (error) {
    console.error('List vets error', error.message);
    res.status(500).json({ message: 'Failed to load vets' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const vet = await getVetById(req.params.id);
    if (!vet) {
      return res.status(404).json({ message: 'Vet not found' });
    }
    res.json(vet);
  } catch (error) {
    console.error('Get vet error', error.message);
    res.status(500).json({ message: 'Failed to load vet' });
  }
});

router.post('/:id/services', async (req, res) => {
  try {
    const { serviceName, price, name, address, phone } = req.body;
    if (!serviceName || typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: 'serviceName and positive price are required' });
    }
    const vet = await addServicePrice(req.params.id, {
      serviceName,
      price,
      name,
      address,
      phone,
    });
    const total = vet.ratings?.reduce((sum, rating) => sum + rating.rating, 0) || 0;
    const average = vet.ratings?.length ? total / vet.ratings.length : 0;
    vet.averageRating = Number.isFinite(average) ? Number(average.toFixed(2)) : 0;
    res.status(201).json(vet);
  } catch (error) {
    console.error('Add service price error', error.message);
    res.status(500).json({ message: 'Failed to add service price' });
  }
});

router.post('/:id/ratings', async (req, res) => {
  try {
    const { rating } = req.body;
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }
    const vet = await addRating(req.params.id, { rating });
    res.status(201).json(vet);
  } catch (error) {
    if (error.message === 'Vet not found') {
      return res.status(404).json({ message: 'Vet not found' });
    }
    console.error('Add rating error', error.message);
    res.status(500).json({ message: 'Failed to add rating' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required' });
    }
    const vet = await upsertVet({
      id: req.body.id,
      name,
      address,
      phone,
      averageRating: 0,
      ratings: [],
      services: [],
      source: 'community',
    });
    res.status(201).json(vet);
  } catch (error) {
    console.error('Create vet error', error.message);
    res.status(500).json({ message: 'Failed to create vet' });
  }
});

export default router;
