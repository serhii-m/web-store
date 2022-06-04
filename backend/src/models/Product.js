const {Schema, model, Types} = require('mongoose')
const slugGeneretor = require('../helpers/slugGenerator')
const Type = require('../models/Type')
const TagType = require('../models/TagType')

const Product = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  orderCounter: {
    type: Number,
    default: 0,
    required: true
  },
  tagsIds: [{
    type: Types.ObjectId,
    ref: 'Type'
  }],
  slug: {
    type: String,
    default: ''
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

Product.pre('save', function(next) {
  this.slug = slugGeneretor(this.title.toLowerCase())
  next()
})

module.exports = model('Product', Product)