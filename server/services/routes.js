import express from 'express';
import Entry from '../models/entry.js';

const router = express.Router();

router.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

router.post('/entries', async (req, res) => {
  try {
    const newEntry = new Entry({
      emotion: req.body.emotion,
      text: req.body.text,
      date: new Date()
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save entry' });
  }
});

export default router;
