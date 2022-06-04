const TagType = require('../models/TagType')
const Type = require('../models/Type')
const Product = require('../models/Product')
const {validationResult} = require('express-validator')

class TagTypeController {

  async create (req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill a title", errors})
      }

      const { title } = req.body
      const tagType = await TagType.create({ title })
      return res.json(tagType)
    } catch (e) {
      res.status(400).json({message: "Error: Such tagType already exists"})
    }
  }


  async update (req, res) {
    try {
      const tagType = req.body

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill a title", errors})
      }

      if (!tagType._id) {
        res.status(400).json( { message: 'Id not specified' })
      }

      if (!tagType.title) {
        res.status(400).json( { message: 'Such tagType already exists' })
      }

      const { title } = req.body;
      const updatedTagType = await TagType
          .findByIdAndUpdate(tagType._id, { title }, { new: true })
      return res.json(updatedTagType)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }


  async delete (req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Id not specified'})
      }

      const deletedTypes = await Type.find({tagTypeId: id})
      const deletedTypesIds = deletedTypes.map(type => {
        return type._id
      })
      const tagType = await TagType.findByIdAndDelete(id)
      await Type.deleteMany({ tagTypeId: id })
      await Product.updateMany(
          {},
          { $pullAll: {tagsIds: [...deletedTypesIds] } }
      )
      return res.json(tagType)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async getAll (req, res) {
    try {
      const tagTypes = await TagType.find()
      res.json(tagTypes)
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

      const tagType = await TagType.findById(id)
      return res.json(tagType)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res) { // for users
    try {
      const { slug } = req.params;

      if (!slug) {
        res.status(400).json({ message: "Not found !" });
      }

      const tagType = await TagType.findOne({ slug });
      res.json(tagType);
    } catch (e) {
      res.status(500).json(e);
    }
  }

}

module.exports = new TagTypeController()