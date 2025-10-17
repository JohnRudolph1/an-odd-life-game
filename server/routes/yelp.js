// FILE: server/routes/yelp.js
// Dependencies: Express router using axios to proxy Yelp Fusion requests; mounted in index.js under /api/yelp.

import express from 'express';
import axios from 'axios';

const router = express.Router();
const YELP_BASE_URL = 'https://api.yelp.com/v3';

function getClient() {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    throw new Error('YELP_API_KEY is not set');
  }
  return axios.create({
    baseURL: YELP_BASE_URL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

router.get('/search', async (req, res) => {
  try {
    const { location, sort_by: sortBy = 'best_match', limit = 20 } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'location query parameter is required' });
    }

    const client = getClient();
    const response = await client.get('/businesses/search', {
      params: {
        location,
        sort_by: sortBy,
        limit,
        categories: 'veterinarians',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Yelp search error', error.message);
    res.status(500).json({ message: 'Failed to contact Yelp service' });
  }
});

router.get('/business/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = getClient();
    const response = await client.get(`/businesses/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Yelp business error', error.message);
    res.status(500).json({ message: 'Failed to retrieve business details' });
  }
});

export default router;
