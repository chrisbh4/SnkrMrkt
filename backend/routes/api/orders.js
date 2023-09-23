const express = require("express")
const asyncHandler = require("express-async-handler")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")
const { Orders } = require("../../db/models")
const orders = Orders

const validateOrderForm = [
   check("username")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be a logged in User"),
   check("email")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a email"),
   check("nameOnCard")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input the full name on the card"),
   check("cardNumber")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a card number"),
   check("expirationDate")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input an expiration date"),
   check("cvvNumber")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a CVV"),
   check("firstName")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a first name"),
   check("lastName")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a last name"),
   check("address")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a billing address"),
   check("city")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a city name"),
   check("country")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must select a one of the available countries"),
   check("stateProvince")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a State or Province"),
   check("postalCode")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a Postal Code or Zip code"),
   check("phoneNumber")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must input a Phone number"),
   handleValidationErrors
]


const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
   const orders = await Orders.findAll()
   res.json(orders)
}))

router.get('/:id', asyncHandler(async (req, res) => {
   const order = await Orders.findByPk(req.params.id)
   return res.send(order)
}))


router.post('/new', validateOrderForm, asyncHandler(async (req, res) => {
   const {
      username,
      userId,
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
      shoeIds } = req.body

   const newOrder = await orders.create({
      userId, username, email, nameOnCard, cardNumber, expirationDate, cvvNumber, firstName, lastName, company, address,
      otherAddress, city, country, stateProvince, postalCode, phoneNumber, shoeIds
   })

   return res.json({ newOrder })

}))




module.exports = router;
