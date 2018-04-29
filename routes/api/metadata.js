const router = require('express').Router()
const mongoose = require('mongoose')
const IpfsAPI = require('ipfs-api')
const { StringDecoder } = require('string_decoder');
const ipfsConfig = require('../../config').ipfs

const Metadata = mongoose.model('Metadata')

const decoder = new StringDecoder('utf8');

const ipfs = new IpfsAPI(ipfsConfig)

const parse = (metadata) => JSON.parse(metadata.toString())

router.get('/:hash', async (req, res, next) => {
  const hash = req.params.hash
  let data
  try {
    data = await ipfs.files.cat(hash)
  } catch (e) {
    console.error(e)
    metadataObject = await Metadata.findOne({hash})
    data = metadataObject.data
  }
  return res.json({data: JSON.parse(data.toString())})
})

module.exports = router
