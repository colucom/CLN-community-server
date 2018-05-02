var router = require('express').Router()
var mongoose = require('mongoose')
var Community = mongoose.model('Community')

// return a list of tags
router.get('/', async (req, res, next) => {
  const communities = await Community.find()
  return res.json({data: communities})
})

router.get('/:address', async (req, res, next) => {
  const address = req.params.address
  const community = await Community.findOne({address})
  return res.json({data: community})
})

router.post('/', async (req, res, next) => {
  const community = new Community({...req.body.community, verified: false})
  await community.save()
  return res.json({data: community})
})

module.exports = router
