const mongo = require('../../server/mongodb');
const mongoose = require('mongoose');

module.exports = mongo.model('Counter', new mongoose.Schema({
  _id:{
      type:String,
      required:true
  },
  sequence: {
    type: Number,
    required: true
  }
}));