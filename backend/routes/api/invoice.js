const express = require("express")
const asyncHandler = require("express-async-handler")
const { Review, Shoe } = require("../../db/models")
const {check} = require("express-validator")
const {handleValidationErrors} = require("../../utils/validation")
const Reviews = Review
const Shoes = Shoe

const validateReview = [
   check('comment')
   .isLength({min:5, max:250})
   .withMessage("Comment must be greater than 5 characters and less than 250"),
   check('rating')
   .isFloat({min:1, max:5})
   .withMessage("Rating must be between 1 and 5"),
   handleValidationErrors
]


const router = express.Router()

// will have to map through all the reviews on the frontend and use a if condition that checks shoeId with Reviews.shoeId
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


router.post('/new',validateReview, asyncHandler(async (req, res) => {
   const { shoeId, userId, comment, rating, image } = req.body
   const newReview = await Review.create({ shoeId, userId, comment, rating, image })
   return res.json({ newReview })

}))






module.exports = router;
