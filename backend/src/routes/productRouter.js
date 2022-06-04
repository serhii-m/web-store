const Router = require('express')
const productRouter = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require("express-validator")

const productRoute = '/admin/pages/products'
const userRoute = '/store'

productRouter.post(productRoute, authMiddleware,
    check('title', 'price', 'img', 'description', 'orderCounter', 'tagsIds').notEmpty(), productController.create)
productRouter.get(productRoute, authMiddleware, productController.getAll)
productRouter.get(userRoute + '/:slug', productController.getOne);
productRouter.get(userRoute, productController.getAll)
productRouter.get(productRoute + '/:id', authMiddleware, productController.getOne)
productRouter.put(productRoute + '/:id', authMiddleware,
    check('title', 'price', 'img', 'description', 'orderCounter', 'tagsIds').notEmpty(), productController.update)
productRouter.delete(productRoute + '/:id', authMiddleware, productController.delete)

module.exports = productRouter