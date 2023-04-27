const express = require("express")
const asyncHandler = require("express-async-handler")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")
const { Orders } = require("../../db/models")
const orders = Orders

const validateOrderForm = [
   check("username")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("email")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("nameOnCard")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("cardNumber")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("expirationDate")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("cvvNumber")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("firstName")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("lastName")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("company")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("address")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("otherAddress")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("city")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("country")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("stateProvince")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("postalCode")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   check("phoneNumber")
      .isLength({ min: 1, max: 250 })
      .withMessage("Must be greater than 1 characters and less than 50"),
   handleValidationErrors]


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


router.post('/new', validateOrderForm, asyncHandler(async (req, res) => {
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
      shoeIds } = req.body.payload

   const newOrder = await orders.create({
      username, email, nameOnCard, cardNumber, expirationDate, cvvNumber, firstName, lastName, company, address,
      otherAddress, city, country, stateProvince, postalCode, phoneNumber, shoeIds
   })

   return res.json({ newOrder })

}))


module.exports = router;
