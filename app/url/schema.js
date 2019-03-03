const mongo = require('../../server/mongodb');
const mongoose = require('mongoose');
const visitModel = require('../visit/schema')


module.exports = mongo.model('Url', new mongoose.Schema({
  url: {
    type: String,
    required: true
  },

  user: mongoose.Schema.Types.ObjectId,

  hash: {
    type: String,
    required: true,
    unique: true
  },
  isCustom: {
    type: Boolean,
    required: true
  },

  removeToken: {
    type: String,
    required: true
  },

  protocol: String,
  domain: String,
  path: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  removedAt: Date,

  active: {
    type: Boolean,
    required: true,
    default: true
  },

  //Visit count
  visits: [visitModel]
}));
