const Product = require('../models/Product')
const Order = require('../models/Order')
const {validationResult} = require('express-validator')

class OrderController {
  // ________________________user__________________________________ //
  async create (req, res) {
    try {
      const {
        orderItems, deliveryAddress, userEmail,
        userName, userPhone, totalPrice, checkPay
      } = req.body

      const items = JSON.parse(orderItems)
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill in all required fields", errors})
      }

      const total = items.reduce((res, item) => res += item.price * item.quantity, 0)

      for (let i = 0; i < items.length; i++) {
        await Product.updateOne({_id: items[i].itemId}, {$inc: {orderCounter: items[i].quantity}})
      }

      const order = await Order.create({ orderItems: items, deliveryAddress, userEmail,
        userName, userPhone, totalPrice: total, checkPay })

      console.log(items)

      return res.json({message: "Order created", order})
    } catch (e) {
      res.status(400).json(e)
    }
  }

  // ________________________admin__________________________________ //
  async update (req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({ message: 'Order not found with this Id' })
      }

      const order = await Order.findById(id)

      if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered this order", 400))
      }

      if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity)
        });
      }
      order.orderStatus = req.body.status

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save()

      return res.json(updatedOrder)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async delete (req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Order not found with this Id'})
      }

      const order = await Order.findByIdAndDelete(id)
      return res.json(order)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async getAll (req, res) {
    try {
      let {page, size, sort} = req.query

      if (!page) {
        page = 1
      }
      if (!size) {
        size = 100
      }

      const limit = parseInt(size)
      const skip = (page - 1) * size
      const orders = await Order.find().limit(limit).skip(skip)

      res.json(orders)
    } catch (e) {
      console.log(e)
    }
  }

  
  async getOne (req, res) {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json( { message: 'Id not specified' })
      }

      const order = await Order.findById(id)
      return res.json(order)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new OrderController()


