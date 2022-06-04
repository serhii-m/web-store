const TagType = require('../models/TagType')
const {Schema, model, Types} = require('mongoose')
const slugGeneretor = require('../helpers/slugGenerator')

const Type = new Schema({
  title: {
    type: String,
    required: true
  },
  tagTypeId: {
    type: Types.ObjectId,
    ref: 'TagType',
    required: true
  },
  slug: {
    type: String,
    default: ''
  }
})

Type.pre('save', function(next) {
  this.slug = slugGeneretor(this.title.toLowerCase())
  next()
})

module.exports = model('Type', Type)