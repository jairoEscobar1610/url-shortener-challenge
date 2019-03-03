const uuidv4 = require('uuid/v4');
const { domain } = require('../../environment');
const SERVER = `${domain.protocol}://${domain.host}`;

const CounterModel = require('./schema');

/**
 * Generate and retrieve the next sequence value for hash/token generation
 * @param sequenceName counter sequence name
 * @returns {number} next sequence value
 */
async function generateNextSequence(sequenceName) {
  var sequenceModel = await CounterModel.findOneAndUpdate({
      _id: sequenceName}, 
      {$inc:{sequence:1}}, 
      {new: true,upsert: true});

  return sequenceModel.sequence;
}


module.exports = {
    generateNextSequence
}
