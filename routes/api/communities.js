var router = require('express').Router()
var mongoose = require('mongoose')
var Community = mongoose.model('Community')

// return a list of tags
router.get('/', async (req, res, next) => {
  const communities = await Community.find()
  return res.json({data: communities})
})

router.post('/', async (req, res, next) => {
  const metadata = await Community.find()
  return res.json({metadata})
  Community.find().then(function (communities) {
    return res.json({communities})
  }).catch(next)
})

module.exports = router
