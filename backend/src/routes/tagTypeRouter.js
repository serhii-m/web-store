const Router = require('express')
const tagTypeRouter = new Router()
const tagTypeController = require('../controllers/tagTypeController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require("express-validator")

const tagRoute = '/admin/pages/tags'
const userRoute = '/store/tagtypes'

tagTypeRouter.post(tagRoute, authMiddleware,
    check('title', "Title cannot be empty").notEmpty(), tagTypeController.create)
tagTypeRouter.get(tagRoute, authMiddleware, tagTypeController.getAll)
tagTypeRouter.get(userRoute, tagTypeController.getAll)
tagTypeRouter.get(userRoute + "/:slug", tagTypeController.getOne);
tagTypeRouter.get(tagRoute + '/:id', authMiddleware, tagTypeController.getOne)
tagTypeRouter.put(tagRoute, authMiddleware,
    check('title', "Title cannot be empty").notEmpty(),
    tagTypeController.update)
tagTypeRouter.delete(tagRoute + '/:id', authMiddleware, tagTypeController.delete)

module.exports = tagTypeRouter