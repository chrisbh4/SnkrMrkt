const express = require("express")
const asyncHandler = require("express-async-handler")
const { Shoe } = require('../../db/models/')
const Shoes = Shoe

const router = express.Router()

router.get('/', asyncHandler(async (req, res )=>{
    const allShoes = await Shoes.findAll()
    return res.send(allShoes)
}));

module.exports = router
