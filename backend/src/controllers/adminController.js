const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id) => {
  const payload = { id }
  return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class adminController {

  async registration (req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Registration error", errors})
      }

      const {username, email, password} = req.body;
      const candidate = await Admin.findOne({ email })

      if (candidate) {
        return res.status(400).json({message: "An administrator with the same email already exists"})
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const admin = new Admin({username, email, password: hashPassword})
      await admin.save()
      return res.json({message: " successfully registered"})
    } catch (e) {
      return res.status(400).json({message: "Registration error"})
    }
  }


  async login(req, res) {
    try {
      const {email, password} = req.body
      const admin = await Admin.findOne({email})

      if (!admin) {
        return res.status(400).json({message: `An administrator with ${email} not found`})
      }

      const validPassword = bcrypt.compareSync(password, admin.password)

      if (!validPassword) {
        return res.status(400).json({message: `Wrong password entered`})
      }

      const token = generateAccessToken(admin._id)
      return res.json({token})
    } catch (e) {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Login error", errors})
      }
    }
  }


  async getAll(req, res) {
    try {
      const admins = await Admin.find()
      res.json(admins)
    } catch (e) {
      res.json(e)
    }
  }


  async getOne (req, res) {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json( { message: 'Id not specified' })
      }

      const admin = await Admin.findById(id)
      return res.json(admin)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async update (req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Update error", errors})
      }

      const admin = req.body

      if (!admin._id) {
        res.status(400).json( { message: 'Id not specified' })
      }

      const {username, email, password} = req.body;
      const hashPassword = bcrypt.hashSync(password, 7);
      const updatedAdmin = await Admin
          .findByIdAndUpdate(admin._id, {username, email, password: hashPassword}, { new: true })
      return res.json(updatedAdmin)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async delete(req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Id not specified'})
      }

      const admin = await Admin.findByIdAndDelete(id)
      return res.json(admin)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new adminController()