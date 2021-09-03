const express = require("express")
const asyncHandler = require("express-async-handler")
const { Review, Shoe } = require("../../db/models")
const Reviews = Review
const Shoes = Shoe



const router = express.Router()

// will have to map through all the reviews on the frontend and use a if condition that checks shoeId with Reviews.shoeId
router.get('/', asyncHandler(async (req, res )=>{
  const reviews = await Reviews.findAll()

  const allReviews = {}
   reviews.forEach((review)=>{
//       if(!allReviews[review.id]){
//          allReviews[review.id] = review
//       }
//   })
      if(!allReviews[review.id]){
         allReviews[review.id] = review
      }else{
         //place in the objects {} as a value of the object[key'ed in id]= object
         allReviews[review.id]={}
      }
  })

  res.json(allReviews)
}))

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
