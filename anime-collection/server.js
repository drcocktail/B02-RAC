// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Anime = require('./models/Anime');

const app = express();

// Middleware
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


// Routes
// Create an anime
app.post('/api/anime', async (req, res) => {
  try {
    const { name, releaseYear, episodes, description } = req.body;
    const anime = new Anime({ name, releaseYear, episodes, description });
    await anime.save();
    res.status(201).json(anime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all anime
app.get('/api/anime', async (req, res) => {
  try {
    const animeList = await Anime.find();
    res.json(animeList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an anime by ID
app.get('/api/anime/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an anime
app.put('/api/anime/:id', async (req, res) => {
  try {
    const { name, releaseYear, episodes, description } = req.body;
    const anime = await Anime.findByIdAndUpdate(
      req.params.id,
      { name, releaseYear, episodes, description },
      { new: true }
    );
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json(anime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an anime
app.delete('/api/anime/:id', async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json({ message: 'Anime deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter by release year
app.post('/api/anime/filter', async (req, res) => {
  try {
    const { year } = req.body;
    const animeList = await Anime.find({
  releaseYear: { $gte: startYear, $lte: endYear }
});
    res.json(animeList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort by number of episodes
app.get('/api/anime/sort/episodes', async (req, res) => {
  try {
    const animeList = await Anime.find().sort({ episodes: 1 });
    res.json(animeList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
