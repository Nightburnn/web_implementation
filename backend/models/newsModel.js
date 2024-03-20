// models/newsModel.js

const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  author: String,
  source: {
    id: String,
    name: String
  },
  publishedAt: Date,
  url: String
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
