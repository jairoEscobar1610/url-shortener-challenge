const router = require('express').Router();
const url = require('./url');
const { domain } = require('../../environment');
const SERVER = `${domain.protocol}://${domain.host}`;

router.get('/:hash', async (req, res, next) => {

  //Get url and register visit
  const source = await url.getUrl(req.params.hash);

  //Respond accordingly when the hash wasn't found
  if (!source) {
    return res.status(404).send({ message: `${SERVER}/${req.params.hash} not found` });
  }

  // Hide fields that shouldn't be public
  delete source.protocol;
  delete source.domain;
  delete source.path;

  // Behave based on the requested format using the 'Accept' header.
  // If header is not provided or is */* redirect instead.
  const accepts = req.get('Accept');

  switch (accepts) {
    case 'text/plain':
      res.end(source.url);
      break;
    case 'application/json':
      res.json(source);
      break;
    default:
      res.redirect(source.url);
      break;
  }
});

/**
 * @description return list of urls
 * @param limit Elements per page
 * @param page Page no.
 * @param sortBy String field to sort
 * @param sortType asc or desc
 */
router.get('/list/:limit/:page/:sortBy/:sortType', async (req, res, next) => {

  try {
    //Get url list
    const source = await url.getList(parseInt(req.params.limit), parseInt(req.params.page), req.params.sortBy, req.params.sortType);
    //Get collection size
    const size = await url.getListSize();
    //Respond accordingly when the hash wasn't found
    if (!source || !size) {
      return res.status(404).send({ message: `${SERVER} list of urls not found` });
    }

    res.json(
      {
        list:source,
        pages:Math.ceil(size/req.params.limit)
      }
    );
  } catch (err) {
    return res.status(400).send({ message: "The specified parameters are invalid" });
  }
});


router.post('/', async (req, res, next) => {

  // Validate 'req.body.url' presence
  if (!req.body.url) {
    return res.status(400).send({ message: "The url field is required." })
  }
  try {
    let shortUrl = await url.shorten(req.body.url, await url.generateHash(req.body.url));
    res.json(shortUrl);
  } catch (e) {
    //Personalized Error Messages
    res.status(500).send({ message: "The url format is invalid or the service is temporary unavailable, please try again. " })
    //next(e);
  }
});

/**
 * @description Create custom urls
 */
router.post('/custom', async (req, res, next) => {

  // Validate 'req.body.url' and 'req.body.hash' presence
  if (!req.body.url) {
    return res.status(400).send({ message: "The url field is required." })
  }
  if (!req.body.hash) {
    return res.status(400).send({ message: "The hash field is required." })
  }
  try {
    let shortUrl = await url.custom(req.body.url, req.body.hash);
    if (!shortUrl) { return res.status(400).send({ message: "The specified hash is already in use" }) }
    res.json(shortUrl);
  } catch (e) {
    //Personalized Error Messages
    console.log(e);
    res.status(500).send({ message: "The url or hash format is invalid or the service is temporary unavailable, please try again. " })
    //next(e);
  }
});


router.delete('/:hash/remove/:removeToken', async (req, res, next) => {
  //Remove shortened URL if the remove token and the hash match
  try {
    let removeResult = await url.deleteUrl(req.params.hash, req.params.removeToken);
    if (removeResult) {
      res.send({ message: `${SERVER}/${req.params.hash} has been succesfully removed` });
    } else {
      return res.status(400).send({ message: `${SERVER}/${req.params.hash} cannot be removed, the specified url could not exist` });
    }
  } catch (err) {
    res.status(500).send({ message: "The hash format is invalid or the service is temporary unavailable, please try again. " })
  }
});

module.exports = router;
