import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './services/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', routes);

// ✅ Serve static frontend files from ../client (adjust if needed)
app.use(express.static(path.join(__dirname, '../client')));

// ✅ Fallback route for SPA (Single Page App)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

