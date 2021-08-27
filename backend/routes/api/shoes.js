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

router.put('/:id', asyncHandler(async( req , res )=>{
    const shoe = await Shoe.findByPk(req.params.id)

    shoe.title = req.body.title
    shoe.shoeSize = req.body.shoeSize
    shoe.price = req.body.price
    shoe.image = req.body.image

    await shoe.save()
    return res.json({shoe})

}))

router.delete('/:id', asyncHandler( async ( req, res )=>{
    const shoe = await Shoes.findByPk(req.params.id,{
        include:[Reviews]
    })
    const allReviews = await Reviews.findAll()

    if (!shoe) new Error('Shoe does not exist')

//! Will need to figure out how to be able to delete a shoe with its reviews
//! but not delete the orders.shoeId so we can still keep track of the orders
    allReviews.map((review)=>{
        if (review.shoeId === shoe.id){
            review.destroy()
        }
    })

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
