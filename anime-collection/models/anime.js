// models/anime.js
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  episodes: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
