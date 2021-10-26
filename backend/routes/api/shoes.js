const express = require("express");
const asyncHandler = require("express-async-handler");
const { Shoe, Review } = require('../../db/models');
const {check} = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {  singleMulterUpload  , singlePublicFileUpload, getFileStream} = require('../../aws-S3')


// Saved in pluarl form due to Model naming error
const Shoes = Shoe;
const Reviews = Review;


// const multer  = require('multer')

// const multer = require('multer');
// const upload = multer({ dest: './uploads'});
const router = express.Router();
const validateNewShoe = [
    check('title')
    .isLength({min:5 })
    .withMessage("Shoe title must be greater than 5 characters"),
    check('shoeSize')
    // .exists({checkFalsy:true})
    .isFloat({min:4 , max:18})
    .withMessage("Please provide a shoe size in mens between 4 and 18"),
    check('price')
    // .exists({checkFalsy:true})
    .isFloat({min:1})
    .withMessage("Please provide a price value for this shoe greater than $0.99"),
    check('brand')
    .exists({checkFalsy:true})
    .withMessage("Please select a shoe brand"),
    check('description')
    .isLength({min:10})
    .withMessage("Description must be at least 10 characters long."),
    check('image')
    .exists({checkFalsy:true})
    .withMessage("Please enter image url"),
    handleValidationErrors
]
const validateEditShoe = [
    check('title')
    .isLength({min:5 })
    .withMessage("Shoe title must be greater than 5 characters."),
    check('shoeSize')
    .isFloat({min:4 , max:18})
    .withMessage("Please provide a shoe size in mens between 4 and 18."),
    check('price')
    .isFloat({min:1})
    .withMessage("Please provide a price value for this shoe greater than $0.99 ."),
    check('brand')
    .exists({checkFalsy:true})
    .withMessage("Please select a shoe brand."),
    check('description')
    .isLength({min:10})
    .withMessage("Description must be at least 10 characters long."),
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
router.put('/:id',validateEditShoe, asyncHandler(async (req, res) => {
    const shoe = await Shoe.findByPk(req.params.id)

    shoe.title = req.body.title
    shoe.shoeSize = req.body.shoeSize
    shoe.price = req.body.price
    shoe.image = req.body.image
    shoe.description = req.body.description

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

router.post('/new',  singleMulterUpload('image'), asyncHandler(async (req, res) => {

    // const awsImageObj = req.file;
    const { sellerId, title, shoeSize, price, brand , description} = req.body;
    // console.log(awsImageObj)

    const file = {
        originalname: req.body.sellerId.toString(),
        image: req.body.image
    }
    const result = await singlePublicFileUpload(file)

    //changed image url to become amazon key id
    const image  = result.Key;


        console.log("-----------------------------")
        console.log(result)
        console.log("-----------------------------")



    const newShoe = await Shoes.create({
        sellerId, title, shoeSize, image, price, brand, description
    })
    return res.json({ newShoe })
}))



//need a route to grab the s3 image for each shoe
/*

-[] Frontend
    -[] check if shoe.image includes jpeg or png else send the shoe.image to the fetchAwsImage from the store which connects to the api route
    -[] backend api route takes in shoes, places shoe.image inside the aws download image function to then return the image back to the store fetch call

*/

router.get('/aws-shoes/:id', (req,res)=>{
    
})

module.exports = router
