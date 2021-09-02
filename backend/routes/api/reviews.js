const express = require("express")
const asyncHandler = require("express-async-handler")
const { Review, Shoe } = require("../../db/models")
const Reviews = Review
const Shoes = Shoe



const router = express.Router()



router.get('/:id', asyncHandler(async (req, res) => {
   const review = await Reviews.findByPk(req.params.id)
   // console.log(shoe)
   // const allReviews = await Shoes.findAll()
   debugger
   return res.send(review)

}));


router.delete('/:id', asyncHandler(async (req, res) => {
   const review = await Reviews.findByPk(req.params.id)
   review.destroy()
   return res.json(review.id)
}))



router.post('/new', asyncHandler(async (req, res) => {
   const { shoeId, userId, comment, rating, image } = req.body
   const newReview = await Review.create({ shoeId, userId, comment, rating, image })
   return res.json({ newReview })

}))






module.exports = router;
