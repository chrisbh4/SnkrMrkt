const express = require('express')
const asyncHandler = require('express-async-handler')
const { Review, User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const Reviews = Review

const validateReview = [
  check('comment')
    .isLength({ min: 5, max: 250 })
    .withMessage('Comment must be greater than 5 characters and less than 250'),
  check('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  handleValidationErrors
]

const router = express.Router()

// Get all reviews
router.get('/', asyncHandler(async (req, res) => {
  const reviews = await Reviews.findAll()

  const allReviews = {}
  reviews.forEach((review) => {
    if (!allReviews[review.id]) {
      allReviews[review.id] = review
    }
  })

  res.json(allReviews)
}))

// Get reviews by shoe identifier (either shoeId for local shoes or styleID for StockX shoes)
router.get('/shoe/:identifier', asyncHandler(async (req, res) => {
  const { identifier } = req.params
  const { type } = req.query // 'local' or 'stockx'
  
  let reviews
  if (type === 'stockx') {
    // Get reviews for StockX shoe by styleID
    reviews = await Reviews.findAll({
      where: { styleID: identifier },
      include: [{ model: require('../../db/models').User, attributes: ['username'] }]
    })
  } else {
    // Get reviews for local shoe by shoeId (default behavior)
    reviews = await Reviews.findAll({
      where: { shoeId: parseInt(identifier) },
      include: [{ model: require('../../db/models').User, attributes: ['username'] }]
    })
  }

  const reviewsObject = {}
  reviews.forEach((review) => {
    reviewsObject[review.id] = review
  })

  res.json(reviewsObject)
}))

// Get single review by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const review = await Reviews.findByPk(req.params.id)
  return res.send(review)
}))

// Update review
router.put('/:id', validateReview, asyncHandler(async (req, res) => {
  const review = await Reviews.findByPk(req.params.id)

  review.comment = req.body.comment
  review.rating = req.body.rating
  review.image = req.body.image || ''

  await review.save()
  return res.json(review)
}))

// Delete review
router.delete('/:id', asyncHandler(async (req, res) => {
  const review = await Reviews.findByPk(req.params.id)
  review.destroy()
  return res.json(review.id)
}))

// Create new review
router.post('/new', validateReview, asyncHandler(async (req, res) => {
  const { shoeId, styleID, userId, comment, rating, image } = req.body
  
  // Validate that either shoeId or styleID is provided, but not both
  if ((shoeId && styleID) || (!shoeId && !styleID)) {
    return res.status(400).json({
      errors: ['Review must be for either a local shoe (shoeId) or StockX shoe (styleID), but not both']
    })
  }
  
  const reviewData = {
    userId,
    comment,
    rating,
    image: image || ''
  }
  
  // Add the appropriate identifier
  if (shoeId) {
    reviewData.shoeId = shoeId
  } else {
    reviewData.styleID = styleID
  }
  
  const newReview = await Review.create(reviewData)
  
  // Fetch the review with User association to include username
  const reviewWithUser = await Review.findByPk(newReview.id, {
    include: [{ model: User, attributes: ['username'] }]
  })
  
  return res.json({ newReview: reviewWithUser })
}))

module.exports = router
