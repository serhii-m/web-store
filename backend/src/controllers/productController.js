const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const Type = require('../models/Type')
const TagType = require('../models/TagType')
const Product = require('../models/Product')
const {validationResult} = require('express-validator')
let userPath = ''

class ProductController {

  async create(req, res) {
    try {
      const {title, price, description, orderCounter, tagsIds} = req.body
      const tags = JSON.parse(tagsIds)
      const {img} = req.files
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill in all required fields", errors})
      }

      const fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))
      const product = await Product.create({
        title, price, img: fileName,
        description, orderCounter,
        tagsIds: tags
      })
      return res.json(product)
    } catch (e) {
      res.status(400).json(e)
    }
  }


  async update(req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Id not specified'})
      }

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Please, fill in all required fields", errors})
      }

      const {title, price, description, orderCounter, tagsIds} = req.body;
      const tags = JSON.parse(tagsIds)
      const {img} = req.files
      const fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))

      const product = await Product.findById(id)
      const imgPath = path.resolve(__dirname, '..', '..', 'static', product.img)
      fs.unlinkSync(imgPath)

      const updatedProduct = await Product
          .findByIdAndUpdate(id, {
            title, price, img: fileName, description, orderCounter, tagsIds: tags
          }, {new: true})
      return res.json(updatedProduct)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }


  async delete(req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Id not specified'})
      }

      const product = await Product.findByIdAndDelete(id)
      return res.json(product)
    } catch (e) {
      res.status(500).json(e)
    }
  }


  async getAll(req, res) {   // for admin
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
      const products = await Product.find().limit(limit).skip(skip)

      res.json(products)
    } catch (e) {
      res.json(e)
    }
  }


  async getAll(req, res) {   // for user
    const {tagSlug, productName} = req.query;
    let products = null
    try {
        products = await Product.find().limit(40).sort({ createdAt: -1 });
      // const products = await Product.find().limit(18)
      res.json(products)
    } catch (e) {
      res.json(e)
    }
  }


  async getOne(req, res) {
    try {
      const {id} = req.params

      if (!id) {
        res.status(400).json({message: 'Id not specified'})
      }

      const product = await Product.findById(id)
      return res.json(product)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res) {  // for users
    try {
      const { slug } = req.params;

      if (!slug) {
        res.status(400).json({ message: "Not found!" });
      }

      const product = await Product.findOne({ slug: `${slug}` });
      res.json(product);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new ProductController()


