const express = require("express")
const asyncHandler = require("express-async-handler")
const { Shoe, Review } = require('../../db/models')

// Saved in pluarl form due to Model naming error
const Shoes = Shoe
const Reviews = Review

const router = express.Router()



router.get('/', asyncHandler(async (req, res) => {
    // const allShoes = await Shoes.findAll({
    //     include:[Reviews]
    // })
    const shoes = await Shoes.findAll({
        include: [Reviews]
    })

    const allShoes = {}

    // Sets the Key's to the shoes.id so that each key matches the id of the shoe
    shoes.forEach((shoe) => {
        if (!allShoes[shoe.id]) {
            allShoes[shoe.id] = shoe
        }
    })
    //  console.log(allShoes)

    return res.json(allShoes)
}));



router.get('/:id', asyncHandler(async (req, res) => {
    const shoe = await Shoes.findByPk(req.params.id, {
        include: [Reviews]
    })
    return res.send(shoe)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    const shoe = await Shoe.findByPk(req.params.id)

    shoe.title = req.body.title
    shoe.shoeSize = req.body.shoeSize
    shoe.price = req.body.price
    shoe.image = req.body.image

    await shoe.save()
    return res.json({ shoe })

}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const shoe = await Shoes.findByPk(req.params.id, {
        include: [Reviews]
    })
    const allReviews = await Reviews.findAll()

    if (!shoe) new Error('Shoe does not exist')

    //TODO: Look into sequelize casacading to be able to delete a shoe and all of its reviews without deleting the shoeId in an Orders table
    allReviews.map((review) => {
        if (review.shoeId === shoe.id) {
            review.destroy()
        }
    })

    await shoe.destroy()
    return
}))


router.post('/new', asyncHandler(async (req, res) => {
    const { sellerId, title, shoeSize, image, price } = req.body
    const newShoe = await Shoes.create({
        sellerId, title, shoeSize, image, price
    })

    return res.json({ newShoe })
}))


module.exports = router
