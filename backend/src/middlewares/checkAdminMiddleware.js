const Admin = require('../models/Admin')

module.exports = async (req, res, next) => {
  try {
    const checkAdmin = await Admin.find()
    if (checkAdmin.length > 0) {
      next()
    }

    const admin = new Admin({
      username: process.env.BASE_USERNAME,
      email: process.env.BASE_EMAIL,
      password: process.env.BASE_PASSWORD
    })

    await admin.save()
    next()
  } catch (e) {
    console.log(e)
  }
}