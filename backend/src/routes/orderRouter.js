const Router = require('express')
const orderRouter = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require("express-validator")

const adminRoute = '/admin/pages/orders'
const userRoute = '/store/order'

orderRouter.post(userRoute,
    check('orderItems', 'deliveryAddress', 'userEmail',
        'userName', 'userPhone', 'checkPay').notEmpty(), orderController.create)
orderRouter.get(adminRoute, authMiddleware, orderController.getAll)
orderRouter.get(adminRoute + '/:id', authMiddleware, orderController.getOne)
orderRouter.put(adminRoute + '/:id', authMiddleware, orderController.update)
orderRouter.delete(adminRoute + '/:id', authMiddleware, orderController.delete)

module.exports = orderRouter