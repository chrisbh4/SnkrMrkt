const express = require('express')
const asyncHandler = require('express-async-handler')
const SneaksAPI = require('sneaks-api');

const sneaks = new SneaksAPI();
const router = express.Router()

/*
TODO:
- [x] StockX API
    - [ ] OAuth connected with credentials
    - [ ] Single Shoe search works and fetched API data includes images

- [ ] Sneaks API
    - [X] React.JS store connected
    - [ ] Single Shoe search bar works and 
        - [ ] /:shoe UI/UX page rendering and API data rendering
        - [ ] Related Products added to Single Shoe Page
    - [ ] Most Popular Shoes added to Landing page
    - [ ]

 */

//TODO: This will be the search bar functionality
router.post('/search', asyncHandler(async (req, res) => {
    
    console.log(req.body)
    const shoeNameSearch = req.body.shoe
    await sneaks.getProducts(shoeNameSearch, 1, function (err, product) {
        // const objPro =Object.values(products)[0]
        // console.log("Func :", objPro.releaseDate)
        // console.log("error :", err)
        res.json(product);

    })
}));

// // router.get('/most-popular', asyncHandler(async (req, res) => {
router.get('/most', asyncHandler(async (req, res) => {
    await sneaks.getMostPopular(10, function(err, products){
        res.json(products)
    })
}));








module.exports = router
