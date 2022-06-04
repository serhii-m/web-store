const {Schema, model, Types} = require('mongoose')
const Product = require('../models/Product')


const Order = new Schema({
  orderItems: [{
    itemId: {
      type: Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  deliveryAddress: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true
  },
  checkPay: {
    type: String,
    default: 'draft',
    required: true
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

module.exports = model('Order', Order)