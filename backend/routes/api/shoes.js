const express = require("express");
const asyncHandler = require("express-async-handler");
const { Shoe, Review } = require('../../db/models');
const {check} = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {  singleMulterUpload  , singlePublicFileUpload} = require('../../aws-S3')
const { uploadFile } = require("../../aws-S3");

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
    const { sellerId, title, shoeSize, image, price, brand , description} = req.body;
    // console.log(awsImageObj)

    const file = {
        originalname: req.body.sellerId.toString(),
        image: req.body.image
    }
    const result = await singlePublicFileUpload(file)


        console.log("-----------------------------")
        console.log(result)
        console.log("-----------------------------")
        // console.log(awsImageUrl)

    // console.log(awsImageObj)

    // const imageKey = await uploadFile(file);
    // console.log(imageKey)



/*
    req.body = {
  sellerId: 1,
  title: 'AWS TEST day 2 #10',
  shoeSize: 6,
  image: 'https://image.goat.com/240/attachments/product_template_pictures/images/008/655/040/original/94407_00.png.png',
  price: '750.00',
  brand: 'Yeezy',
  description: "The Air Jordan 1 Retro High OG 'Chicago' 2015 colorway was designed to avoid Jordan's $5,000-per game fines from the NBA after the original black "
}


req.path = /new

*/
// console.log("-------------------")
//     console.log(req.body)
//     console.log("------------------- path")
//     console.log(req.path)
    /*
        - use the 'Key' t to be able to key-into the aws-image later on for image rendering on the frontend

    */
   // * watch video and see where he talks about the "file.path" and also the "file.filename" inside "uploadFile()"
   // * try finding the correct path



    const newShoe = await Shoes.create({
        sellerId, title, shoeSize, image, price, brand, description
    })
    return res.json({ newShoe })
}))


//* Thursdays progress
/* - need to get multer to give me a upload file
   - need to get access to a path and send the image url

Postman Error : {
    "title": "Server Error",
    "message": "EISDIR: illegal operation on a directory, read",
    "stack": "Error: EISDIR: illegal operation on a directory, read"
}
*/

// router.get('/:id/reviews', asyncHandler(async (req, res )=>{
//     const shoe = await Shoe.findByPk(req.params.id);

//     let {id} = shoe
//     // console.log(shoeId)
//     // const allShoeReviews = await Reviews.findByPk({shoeId})

//     // return ({allShoeReviews})
//     return res.send(shoe)
//  }))



module.exports = router
