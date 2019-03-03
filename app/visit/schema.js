const mongo = require('../../server/mongodb');
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  visitedAt: {
    type: Date,
    required: true
  }
});