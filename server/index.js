// FILE: server/index.js
// Dependencies: Entry point for Express API; registers middleware and feature routers.

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import yelpRouter from './routes/yelp.js';
import vetsRouter from './routes/vets.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'transparentsee-api' });
});

app.use('/api/yelp', yelpRouter);
app.use('/api/vets', vetsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`TransparentSee server listening on port ${port}`);
});
