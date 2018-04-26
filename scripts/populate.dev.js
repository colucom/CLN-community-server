var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/CLN-community-app')

require('../models')

var Community = mongoose.model('Community')
var Metadata = mongoose.model('Metadata')

new Community({
  name: 'CoolCoin',
  symbol: 'CC',
  address: '0x296582CAb0e44009d2142D7daf33C81f153407F8',
  metadata: 'QmW7ctbtwQuNQC3Jp6KidztXukyEhtBMQr5oskN3Vi7XBp'
}).save()

new Community({
  name: 'HipCoin',
  symbol: 'HC',
  address: '0x3355e0C28D759d6d4eF649EF3a6dba11402d1a7f',
  metadata: 'QmbtpFqCo4v9v3b5HvTxmzaZyKgooVSgNhm6qZsmorj4M5'
}).save()

new Metadata({
  hash: 'QmW7ctbtwQuNQC3Jp6KidztXukyEhtBMQr5oskN3Vi7XBp',
  data: [123, 34, 108, 97, 116, 34, 58, 34, 48, 34, 44, 34, 108, 110, 103, 34,
     58, 34, 49, 34, 44, 34, 116, 105, 116, 108, 101, 34, 58, 34, 84, 114, 105,
     98, 101, 32, 67, 97, 108, 108, 101, 100, 32, 81, 117, 101, 115, 116, 49,
     34, 125]
}).save()

new Metadata({
  hash: 'QmbtpFqCo4v9v3b5HvTxmzaZyKgooVSgNhm6qZsmorj4M5',
  data: [123, 34, 108, 97, 116, 34, 58, 34, 53, 49, 34, 44, 34, 108, 110, 103,
     34, 58, 34, 53, 50, 34, 44, 34, 116, 105, 116, 108, 101, 34, 58, 34, 121,
    111, 121, 111, 121, 111, 34, 125]
  }).save()

// mongoose.disconnect()
