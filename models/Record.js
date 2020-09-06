const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
  createdAt: Date,
  totalCount: Number,
  key: String,
});

module.exports = mongoose.model('record', BootcampSchema);
