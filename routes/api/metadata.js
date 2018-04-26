const router = require('express').Router()
const mongoose = require('mongoose')
const IpfsAPI = require('ipfs-api')
const { StringDecoder } = require('string_decoder');
const ipfsConfig = require('../../config').ipfs

const Metadata = mongoose.model('Metadata')

const decoder = new StringDecoder('utf8');

// router.param('hash', function (req, res, next, hash) {
//   req.hash = hash
//   next();
// });

const ipfs = new IpfsAPI(ipfsConfig)

const parse = (metadata) => JSON.parse(metadata.toString())

router.get('/', async (req, res, next) => {
  const metadata = await Metadata.find()
  return res.json({metadata})
})


router.get('/:hash', async (req, res, next) => {
  const hash = req.params.hash
  let metadata
  try {
    metadata = await ipfs.files.cat(hash)
  } catch (e) {
    console.error(e)
    metadataObject = await Metadata.findOne({hash})
    metadata = metadataObject.data
  }
  return res.json({metadata: JSON.parse(metadata.toString())})
})

module.exports = router
