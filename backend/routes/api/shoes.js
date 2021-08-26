const express = require("express")
const asyncHandler = require("express-async-handler")
const { Shoe, Review } = require('../../db/models')

// Saved in pluarl form due to Model naming error
const Shoes = Shoe
const Reviews = Review

const router = express.Router()

router.get('/', asyncHandler(async (req, res )=>{
    const allShoes = await Shoes.findAll({
        include:[Reviews]
    })
    return res.send(allShoes)

    // const allReviews = await Reviews.findAll()
    // return res.send(allReviews)
}));



router.get('/:id', asyncHandler(async ( req , res )=>{
    const shoe = await Shoes.findByPk(req.params.id,{
        include:[Reviews]
    })
    return res.send(shoe)
}))


router.delete('/:id', asyncHandler( async ( req, res )=>{
    const shoe = await Shoes.findByPk(req.params.id,{
        include:[Reviews]
    })

    if (!shoe) new Error('Shoe does not exist')

     await shoe.destroy()
     
    // await shoe.destroy({
    //     where:{
    //         id:id
    //     }
    // })
    return
}))


router.post('/new', asyncHandler(async ( req , res )=>{
    const {sellerId , title, shoeSize, image, price} = req.body
    const newShoe = await Shoes.create({
        sellerId, title, shoeSize, image, price
    })

    return res.json({newShoe})
}))


module.exports = router
