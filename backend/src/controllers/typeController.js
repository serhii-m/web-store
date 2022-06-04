const Type = require('../models/Type')
const TagType = require('../models/TagType')
const {validationResult} = require('express-validator')

class TypeController {

  async create (req, res) {
    try {
      const { title, tagTypeId, slug } = req.body
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill a title", errors})
      }

      const tag = await TagType.findById(tagTypeId)
      const type = await Type.create({ title, tagTypeId: tag._id, slug })
      return res.json(type)
    } catch (e) {
      res.status(400).json(e)
    }
  }


  async update (req, res) {
    try {
      const type = req.body

      if (!type._id) {
        res.status(400).json({ message: 'Id not specified' })
      }

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill a title", errors})
      }

      const { title, tagTypeId, slug } = req.body;
      const tag = await TagType.findById(tagTypeId)
      const updatedType = await Type
          .findByIdAndUpdate(type._id, { title, tagTypeId, slug }, { new: true })
      return res.json(updatedType)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async delete (req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Id not specified'})
      }

      const type = await Type.findByIdAndDelete(id)
      return res.json(type)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async getAll (req, res) {
    try {
      const types = await Type.find()
      res.json(types)
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

      const type = await Type.findById(id)
      return res.json(type)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new TypeController()