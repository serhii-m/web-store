const {Schema, model} = require('mongoose')
const slugGeneretor = require('../helpers/slugGenerator')

const TagType = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    default: '',
  }
})

TagType.pre('save', function(next) {
  this.slug = slugGeneretor(this.title.toLowerCase())
  next()
})

module.exports = model('TagType', TagType)