const express = require('express')
const asyncHandler = require('express-async-handler')
const { Shoe, Review } = require('../../db/models')
const { check } = require('express-validator')
const { Op } = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation')
const { singleMulterUpload, awsImageUpload } = require('../../aws-S3')

// Saved in pluarl form due to Model naming error
const Shoes = Shoe

const Reviews = Review

const router = express.Router()
const validateNewShoe = [
  check('title')
    .isLength({ min: 5 })
    .withMessage('Shoe title must be greater than 5 characters'),
  check('shoeSize')
    .isFloat({ min: 4, max: 18 })
    .withMessage('Please provide a shoe size in mens between 4 and 18'),
  check('price')
    .isFloat({ min: 1 })
    .withMessage('Please provide a price value for this shoe greater than $0.99'),
  check('brand')
    .exists({ checkFalsy: true })
    .withMessage('Please select a shoe brand'),
  check('description')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long.'),
  // check('image')
  // .exists({checkFalsy:true})
  // .withMessage("Please enter image url"),
  handleValidationErrors
]
const validateEditShoe = [
  check('title')
    .isLength({ min: 5 })
    .withMessage('Shoe title must be greater than 5 characters.'),
  check('shoeSize')
    .isFloat({ min: 4, max: 18 })
    .withMessage('Please provide a shoe size in mens between 4 and 18.'),
  check('price')
    .isFloat({ min: 1 })
    .withMessage('Please provide a price value for this shoe greater than $0.99 .'),
  check('brand')
    .exists({ checkFalsy: true })
    .withMessage('Please select a shoe brand.'),
  check('description')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long.'),
  handleValidationErrors
]

router.get('/', asyncHandler(async (req, res) => {
  const shoes = await Shoes.findAll({
    include: [Reviews]
  })

  const allShoes = {}
  shoes.forEach((shoe) => {
    if (!allShoes[shoe.id]) {
      allShoes[shoe.id] = shoe
    }
  })

  return res.json(allShoes)
}))

router.get('/filter', asyncHandler(async (req, res) => {
  const { brand, price } = req.query
  const query = {
    where: {}
  }

  if (brand !== 'null' && brand !== 'undefined') {
    query.where.brand = brand
  }

  // TODO: Style Needs to be added to database Schema
  if (price !== 'undefined' && price !== '') {
    if (parseInt(price) === 650) {
      const minPrice = 650
      const maxPrice = 50000
      query.where.price = {
        [Op.between]: [minPrice, maxPrice]
      }
    } else {
      const [minPrice, maxPrice] = price.split('-').map(Number)
      query.where.price = {
        [Op.between]: [minPrice, maxPrice]
      }
    }
  }

  const shoes = await Shoes.findAll(query)

  return res.json(shoes)
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const shoe = await Shoes.findByPk(req.params.id, {
    include: [Reviews]
  })

  return res.send(shoe)
}))

router.put('/:id', singleMulterUpload('image'), validateEditShoe, asyncHandler(async (req, res) => {
  const shoe = await Shoe.findByPk(req.params.id)
  const imageFile = req.file
  if (req.file) {
    shoe.image = await awsImageUpload(imageFile)
  } else {
    shoe.image = req.body.image
  }

  shoe.title = req.body.title
  shoe.shoeSize = req.body.shoeSize
  shoe.price = req.body.price
  shoe.brands = req.body.brands
  shoe.description = req.body.description

  await shoe.save()
  return res.json({ shoe })
}))

router.delete('/:id', asyncHandler(async (req, res) => {
  const shoe = await Shoes.findByPk(req.params.id, {
    include: [Reviews]
  })
  const allReviews = await Reviews.findAll()

  if (!shoe) new Error('Shoe does not exist') // eslint-disable-line

  // TODO: Look into sequelize casacading to be able to delete a shoe and all of its reviews without deleting the shoeId in an Orders table
  allReviews.map((review) => {
    if (review.shoeId === shoe.id) {
      review.destroy()
    }
    return []
  })

  await shoe.destroy()
  return res.json(shoe.id)
}))

router.post('/new', singleMulterUpload('image'), validateNewShoe, asyncHandler(async (req, res) => {
  const awsImageObj = req.file
  const { sellerId, title, shoeSize, price, brand, description } = req.body

  if (awsImageObj !== undefined) {
    const image = await awsImageUpload(awsImageObj)

    const newShoe = await Shoes.create({
      sellerId, title, shoeSize, image, price, brand, description
    })

    return res.json({ newShoe })
  }

  const image = 'https://theplug-app-aws.s3.us-west-1.amazonaws.com/No-Image-Available.png'
  const newShoe = await Shoes.create({
    sellerId, title, shoeSize, image, price, brand, description
  })

  return res.json({ newShoe })
}))

module.exports = router
