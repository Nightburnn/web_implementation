// models/newsModel.js

import mongoose from 'mongoose';

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

export default News;
