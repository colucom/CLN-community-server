const router = require('express').Router()
const mongoose = require('mongoose')
const IpfsAPI = require('ipfs-api')
const { StringDecoder } = require('string_decoder');
const ipfsConfig = require('../../config').ipfs

const Metadata = mongoose.model('Metadata')

const decoder = new StringDecoder('utf8');

const ipfs = new IpfsAPI(ipfsConfig)

const parse = (metadata) => JSON.parse(metadata.toString())

router.get('/:protocol/:hash', async (req, res, next) => {
  const protocol = req.params.protocol
  const hash = req.params.hash
  let data
  if (protocol === 'ipfs') {
    try {
      data = await ipfs.files.cat(hash)
      return res.json({data: {hash, protocol, data: JSON.parse(data.toString())}})
    } catch (e) {
      console.error(e)
      metadata = await Metadata.findOne({protocol, hash})
      return res.json({data: metadata.toJSON()})
    }
  } else {
    metadata = await Metadata.findOne({protocol, hash})
    return res.json({data: metadata.toJSON()})
  }
})


router.post('/', async (req, res, next) => {
  const data = Buffer.from(JSON.stringify(req.body.metadata))

  const filesAdded = await ipfs.files.add(data)
  const hash = filesAdded[0].hash

  const metadata = new Metadata({
    hash,
    data,
    protocol: 'ipfs'
  })

  try {
    await metadata.save()
    return res.json({data: metadata.toJSON()})
  } catch (error) {
      // duplication error, someone already added this hash to db
      if (error.name === 'MongoError' && error.code === 11000) {
        return res.json({data: metadata.toJSON()})
      }
      throw error
  }
})

module.exports = router
