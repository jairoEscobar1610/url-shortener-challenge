const uuidv4 = require('uuid/v4');
const { domain } = require('../../environment');
const SERVER = `${domain.protocol}://${domain.host}`;

const UrlModel = require('./schema');
const parseUrl = require('url').parse;
const validUrl = require('valid-url');

const counter = require('../counter/counter');

//Hash length
const hashLength = 7;

//Base62 object
const base62 = {
  alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    .split(''),
  encode: (base10) => {
    if (base10 === 0) {
      return 0;
    }
    let encodedBase62 = [];
    //While number is greater than 0, keep adding base62 characters to array
    while (base10 > 0) {
      encodedBase62 = [base62.alphabet[base10 % 62], ...encodedBase62];
      base10 = Math.floor(base10 / 62);
    }
    return encodedBase62.join('');
  },
  //Multiply 62^pos per position
  decode: encodedBase62 => encodedBase62.split('').reverse().reduce(
    (prev, curr, index) => {
      return prev + (base62.alphabet.indexOf(curr) * (62 ** index))
    }, 0),
  fill: (encodedBase62) => {
    //Throw error
    if (encodedBase62 === 0) {
      return 0;
    }
    //Fill base62 with 'a' to match the hash length
    return "aaaaaa".slice(0, hashLength - encodedBase62.length) + encodedBase62;
  }

};


/**
 * Lookup for existant, active shortened URLs by hash.
 * 'null' will be returned when no matches were found.
 * @param {string} hash
 * @returns {object}
 */
async function getUrl(hash) {
  let source = await UrlModel.findOneAndUpdate({ active: true, hash },
  {
    $push:{
      visits:{
        visitedAt:new Date()
      }
    }
  });
  return source;
}

/**
 * Generate an unique hash-ish- for an URL.
 * TODO: Deprecated the use of UUIDs.
 * @param {string} url
 * @returns {string} hash
 */
async function generateHash(url) {
  let hash;
  const MAX_ITERATIONS = 10;
  let iterations = 0;

  //Return hash if exists
  const savedUrl = (await checkIfUrlExists(url));
  if(!savedUrl){
  
    //Max iterations before returning null (too many collisions)
    while (iterations++ < MAX_ITERATIONS) {
      let newSequence = await counter.generateNextSequence("hash");
      hash = base62.encode(newSequence);
      //Fill with characters
      hash = base62.fill(hash);

      // make sure the hash isn't already used
      if (!await checkIfHashExists(hash)) {
        break;
      }
    }
  }else{
    hash = savedUrl.hash;
  }
  //If the iterator reaches the MAX_ITERATIONS, then return undefined, if not, return hash
  return (iterations > MAX_ITERATIONS) ? undefined : hash;
}

/**
 * Generate a random token that will allow URLs to be (logical) removed
  * TODO: Deprecated the use of UUIDs.
 * @returns {string} removeToken
 */
async function generateRemoveToken() {
  let removeToken;
  //Max iterations before returning null (too many collisions)
  const MAX_ITERATIONS = 10;
  let iterations = 0;

  while (iterations++ < MAX_ITERATIONS) {
    let newSequence = await counter.generateNextSequence("removeToken");
    removeToken = base62.encode(newSequence);
    //Fill with characters
    removeToken = base62.fill(removeToken);
    break;
  }
  //If the iterator reaches the MAX_ITERATIONS, then return undefined, if not, return removeToken
  return (iterations > MAX_ITERATIONS) ? undefined : removeToken;
}

/**
 * Check if a hash has already been used
 * @param {string} hash 
 * @returns {boolean} hashExists
 */
async function checkIfHashExists(hash) {
  let source = await UrlModel.findOne({ active: true, hash }, { hash: 1 });
  return !!source;
}

/**
 * Check if an url has already been registered and return hash if exists
 * @param {string} url 
 * @returns {string} {hash,removeToken}
 */
async function checkIfUrlExists(url) {
  let source = await UrlModel.findOne({ active: true, url }, { hash: 1, removeToken: 1 });
  return source;
}

/**
 * Create an instance of a shortened URL in the DB.
 * Parse the URL destructuring into base components (Protocol, Host, Path).
 * An Error will be thrown if the URL is not valid or saving fails.
 * @param {string} url
 * @param {string} hash
 * @returns {object}
 */
async function shorten(url, hash) {

  if (!isValid(url)) {
    throw new Error('Invalid URL');
  }
  //Check if the url exists
  const savedUrl = await checkIfUrlExists(url);
  if (!savedUrl) {
    // Get URL components for metrics sake
    const urlComponents = parseUrl(url);
    const protocol = urlComponents.protocol || '';
    const domain = `${urlComponents.host || ''}${urlComponents.auth || ''}`;
    const path = `${urlComponents.path || ''}${urlComponents.hash || ''}`;

    // Generate a token that will alow an URL to be removed (logical)
    const removeToken = await generateRemoveToken();
    // Create a new model instance
    const shortUrl = new UrlModel({
      url,
      protocol,
      domain,
      path,
      hash,
      isCustom: false,
      removeToken,
      active: true
    });

    try {
      const saved = await shortUrl.save();
      return {
        url,
        shorten: `${SERVER}/${hash}`,
        hash,
        removeUrl: `${SERVER}/${hash}/remove/${removeToken}`
      };
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  } else {
    return {
      url,
      shorten: `${SERVER}/${savedUrl.hash}`,
      hash: savedUrl.hash,
      removeUrl: `${SERVER}/${savedUrl.hash}/remove/${savedUrl.removeToken}`
    };
  }
}

/**
 * @description Remove (logically) a shorten url
 * @param {string} hash 
 * @param {string} removeToken 
 */
async function deleteUrl(hash,removeToken){
  let updateResult = await UrlModel.findOneAndUpdate({hash, removeToken, active:true},
    {
      $set:{
        active:false,
        removedAt:new Date()
      }
    });
  return updateResult;
}

/**
 * @description Create a custom url using user hash
 * @param {*} url 
 * @param {*} hash 
 */
async function custom(url, hash) {
  let hashRegex = new RegExp("^[A-Za-z0-9]{7}$");    
  if (!hashRegex.test(hash)) {
    throw new Error('Invalid Hash');
  }
  if (!isValid(url)) {
    throw new Error('Invalid URL');
  }

  //Check if the hash exists
  const savedHash = await checkIfHashExists(hash);
  if (!savedHash) {
    // Get URL components for metrics sake
    const urlComponents = parseUrl(url);
    const protocol = urlComponents.protocol || '';
    const domain = `${urlComponents.host || ''}${urlComponents.auth || ''}`;
    const path = `${urlComponents.path || ''}${urlComponents.hash || ''}`;

    // Generate a token that will alow an URL to be removed (logical)
    
    const removeToken = await generateRemoveToken();
    // Create a new model instance
    const shortUrl = new UrlModel({
      url,
      protocol,
      domain,
      path,
      hash,
      isCustom: true,
      removeToken,
      active: true
    });

    try {
      const saved = await shortUrl.save();
      return {
        url,
        shorten: `${SERVER}/${hash}`,
        hash,
        removeUrl: `${SERVER}/${hash}/remove/${removeToken}`
      };
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  } else {
    //Catch already-registered error
    return null;
  }
}

/**
 * Validate URI
 * @param {any} url
 * @returns {boolean}
 */
function isValid(url) {
  return validUrl.isUri(url);
}

module.exports = {
  shorten,
  custom,
  getUrl,
  generateHash,
  generateRemoveToken,
  isValid,
  deleteUrl
}
