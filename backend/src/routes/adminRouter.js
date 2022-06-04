const Router = require('express')
const adminRouter = new Router()
const adminController = require('../controllers/adminController')
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')
// const checkAdminMiddleware = require('../middlewares/checkAdminMiddleware')


adminRouter.post('/admin', [
  check('email', "Email not valid").isEmail(),
  check('password', "Password must be more than 5 and less than 10 characters ")
      .isLength({min:5, max:10})
], adminController.registration)

adminRouter.post('/admin/login', adminController.login)
adminRouter.get('/admin', authMiddleware, adminController.getAll)
adminRouter.get('/admin/:id', authMiddleware, adminController.getOne)
adminRouter.put('/admin', [
  check('email', "Email not valid").isEmail(),
  check('password', "Password must be more than 5 and less than 10 characters ")
      .isLength({min:5, max:10})
],authMiddleware, adminController.update)
adminRouter.delete('/admin/:id', authMiddleware, adminController.delete)

module.exports = adminRouter