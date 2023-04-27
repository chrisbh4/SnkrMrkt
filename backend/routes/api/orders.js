const express = require("express")
const asyncHandler = require("express-async-handler")
const {check} = require("express-validator")
const {handleValidationErrors} = require("../../utils/validation")
const { Orders } = require("../../db/models")
const orders = Orders

// const validateReview = [
//    check('comment')
//    .isLength({min:5, max:250})
//    .withMessage("Comment must be greater than 5 characters and less than 250"),
//    check('rating')
//    .isFloat({min:1, max:5})
//    .withMessage("Rating must be between 1 and 5"),
//    handleValidationErrors
// ]


const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
   const orders = await Orders.findAll()

   // res.json(allReviews)
   res.json(orders)
}))

router.get('/:id', asyncHandler(async (req, res) => {
   const order = await Orders.findByPk(req.params.id)
   return res.send(order)
}))


router.post('/new', asyncHandler(async (req, res) => {
   const {
           username,
           email,
           nameOnCard,
           cardNumber,
           expirationDate,
           cvvNumber,
           firstName,
           lastName,
           company,
           address,
           otherAddress,
           city,
           country,
           stateProvince,
           postalCode,
           phoneNumber,
           shoeIds} = req.body

   const newOrder = await orders.create({username, email, nameOnCard, cardNumber, expirationDate, cvvNumber, firstName, lastName, company, address,
                                         otherAddress, city, country, stateProvince, postalCode, phoneNumber, shoeIds  })

   return res.json({newOrder})

}))


module.exports = router;



