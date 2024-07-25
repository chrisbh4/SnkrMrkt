const express = require('express')
const asyncHandler = require('express-async-handler')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Orders } = require('../../db/models')
const orderid = require('order-id')('key');
const orders = Orders

const validateOrderForm = [
  check('username')
    .isLength({ min: 1, max: 250 })
    .withMessage('Must be a logged in User'),
  check('email')
    .isEmail()
    .withMessage('Email must be valid'),
  check('nameOnCard')
    .isLength({ min: 1, max: 150 })
    .withMessage('Must input the full name on the card'),
  check('cardNumber')
    .matches(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{1,4}$/)
    .withMessage('Must be a valid card number')
    .custom((value) => {
      const digits = value.replace(/\s/g, '')
      if (digits.length < 13 || digits.length > 19) {
        throw new Error('Card number must be between 13 and 19 digits')
      }
      return true
    }),
  check('expirationDate')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
    .withMessage('Must be a valid MM/YY date')
    .custom((value) => {
      const dateParts = value.split('/')
      const year = `20${dateParts[1]}`
      const expiryDate = new Date(`${year}-${dateParts[0]}-01`)
      if (expiryDate < new Date()) {
        throw new Error('Expiration date must be in the future')
      }
      return true
    }),
  check('cvvNumber')
    .matches(/^[0-9]{3,4}$/)
    .withMessage('Must be a valid CVV number')
    .custom((value) => {
      if (value.length < 3) {
        throw new Error('CVV must be a 3 digit number')
      }
      return true
    }),
  check('firstName')
    .isLength({ min: 1, max: 50 })
    .withMessage('Must input a first name'),
  check('lastName')
    .isLength({ min: 1, max: 50 })
    .withMessage('Must input a last name'),
  check('address')
    .isLength({ min: 1, max: 150 })
    .withMessage('Must input a billing address'),
  check('city')
    .isLength({ min: 1, max: 75 })
    .withMessage('Must input a city name'),
  check('country')
    .isLength({ min: 1, max: 50 })
    .withMessage('Must select a one of the available countries'),
  check('stateProvince')
    .isLength({ min: 1, max: 20 })
    .withMessage('Must input a State or Province'),
  check('postalCode')
    .matches(/^[0-9]{5}$/)
    .withMessage('Must be a valid postal code')
    .custom((value) => {
      if (value.length !== 5) {
        throw new Error('Postal code must be a 5 digit number')
      }
      return true
    }),
  check('phoneNumber')
    .custom((value) => {
      const isValidFormat = /^(\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)
      if (!isValidFormat) {
        throw new Error('Invalid phone number')
      }
      return true
    }),
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
    buyerId,
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
    shoeIds,
    totalAmount
  } = req.body

  const orderNumber = orderid.generate()

  const newOrder = await orders.create({
    buyerId,
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
    shoeIds,
    totalAmount,
    orderNumber
  })

  return res.json({ newOrder })
}))

module.exports = router
