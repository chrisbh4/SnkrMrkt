const express = require('express')
const asyncHandler = require('express-async-handler')
const { Shoe, User, Orders } = require('../../db/models')
const router = express.Router()

router.get('/:id/selling', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [Shoe]
  })
  return res.send(user)
}))

router.get('/:id/orders', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [Orders]
  })

  await Promise.all(user.Orders.map(async (order) => {
    const shoes = await Shoe.findAll({
      where: {
        id: order.shoeIds
      }
    })
    const shoeImages = shoes.map(shoe => shoe.image)
    order.setDataValue('images', shoeImages)
  }))

  return res.json({ user })
}))

router.get('/:id/watching', asyncHandler(async (req, res) => {
  const User = await User.findByPk(req.params.id, {
    include: [Shoe]
  })
  return res.json({ User })
}))

module.exports = router
