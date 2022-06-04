const Router = require('express')
const typeRouter = new Router()
const typeController = require('../controllers/typeController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require("express-validator")

const typeRoute = '/admin/pages/types'
const userRoute = '/store/types'

typeRouter.post(typeRoute, authMiddleware,
    check('title', "Title cannot be empty").notEmpty(), typeController.create)
typeRouter.get(typeRoute, authMiddleware, typeController.getAll)
typeRouter.get(userRoute, typeController.getAll)
typeRouter.get(typeRoute + '/:id', authMiddleware, typeController.getOne)
typeRouter.put(typeRoute, authMiddleware,
    check('title', "Title cannot be empty").notEmpty(), typeController.update)
typeRouter.delete(typeRoute + '/:id', authMiddleware, typeController.delete)

module.exports = typeRouter