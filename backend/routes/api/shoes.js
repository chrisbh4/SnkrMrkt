const express = require("express")
const asyncHandler = require("express-async-handler")
const { Shoe } = require('../../db/models/')
const Shoes = Shoe

const router = express.Router()

router.get('/', asyncHandler(async (req, res )=>{
    const allShoes = await Shoes.findAll()
    return res.send(allShoes)
}));

router.get('/:id', asyncHandler(async ( req , res )=>{
    const shoe = await Shoes.findByPk(req.params.id)
    return res.send(shoe)
}))

router.post('/new', asyncHandler(async ( req , res )=>{
    const {sellerId , title, shoeSize, image, price} = req.body

    const newShoe = await Shoes.create({
        sellerId, title, shoeSize, image, price
    })

    return res.json({newShoe})
}))

module.exports = router
