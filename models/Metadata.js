var mongoose = require('mongoose')

var MetadataSchema = new mongoose.Schema({
  hash: {type: String, unique: true, required: [true, "can't be blank"], index: true},
  data: {type: mongoose.Schema.Types.Buffer}
}, {timestamps: true})

mongoose.model('Metadata', MetadataSchema)
