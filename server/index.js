import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import hugfaceRoutes from './routes/hugfaceRoutes.js';

dotenv.config();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Ensure OPTIONS preflight is handled
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/hface', hugfaceRoutes);

app.get('/', (req, res) => {
  res.send('API is live');
});

// Connect DB at cold start
connectDB(process.env.MONGODB_URL);

// ✅ EXPORT app for Vercel serverless function
export default app;
