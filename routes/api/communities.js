var router = require('express').Router()
var mongoose = require('mongoose')
var Community = mongoose.model('Community')

// return a list of tags
router.get('/', function (req, res, next) {
  Community.find().then(function (communities) {
    return res.json({communities})
  }).catch(next)
})

module.exports = router
