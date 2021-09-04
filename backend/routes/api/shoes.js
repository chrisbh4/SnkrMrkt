const express = require("express")
const asyncHandler = require("express-async-handler")
const { Shoe, Review } = require('../../db/models')
const {check} = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")

// Saved in pluarl form due to Model naming error
const Shoes = Shoe
const Reviews = Review

const router = express.Router()

const validateShoe = [
    check('title')
    .exists({checkFalsy:true})
    .isLength({min:5 })
    .withMessage("Shoe title must be greater than 5 characters"),
    check('shoeSize')
    .exists({checkFalsy:true})
    .isFloat({min:4 , max:18})
    .withMessage("Please provide a shoe size in mens between 4 and 18"),
    check('price')
    .exists({checkFalsy:true})
    .isFloat({min:1})
    .withMessage("Please provide a price value for this shoe greater than $0.99"),
    handleValidationErrors
]


router.get('/', asyncHandler(async (req, res) => {
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
    return res.json(shoe.id)
}))


router.post('/new', validateShoe, asyncHandler(async (req, res) => {
    const { sellerId, title, shoeSize, image, price } = req.body
    const newShoe = await Shoes.create({
        sellerId, title, shoeSize, image, price
    })

    return res.json({ newShoe })
}))



// router.get('/:id/reviews', asyncHandler(async (req, res )=>{
//     const shoe = await Shoe.findByPk(req.params.id);

//     let {id} = shoe
//     // console.log(shoeId)
//     // const allShoeReviews = await Reviews.findByPk({shoeId})

//     // return ({allShoeReviews})
//     return res.send(shoe)
//  }))



module.exports = router
