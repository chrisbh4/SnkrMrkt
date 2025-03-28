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
    - [x] Single Shoe search bar works and 
        - [x] /:shoe UI/UX page rendering and API data rendering
            - [ ] Make sure page refresh doesn't cause an error
        - [ ] Related Products added to Single Shoe Page
        - [ ] Fix Search Bar UI width & spacing 
    - [ ] Most Popular Shoes added to Landing page
    - [ ] Create a Search page UI for when a user searches it make it similar to the Home page UI

 */

//TODO: This will be the search bar functionality
router.post('/search', asyncHandler(async (req, res) => {
    
    console.log(req.body)
    const shoeNameSearch = req.body.shoe
    await sneaks.getProducts(shoeNameSearch, 1, function (err, product) {
        console.log(product[0].styleID)
        res.json(product);

    })
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const styleId = req.params.id
    await sneaks.getProductPrices(styleId, function(err, product){
        console.log(product)
        res.json(product)
    })
}));

// // router.get('/most-popular', asyncHandler(async (req, res) => {
router.get('/most', asyncHandler(async (req, res) => {
    await sneaks.getMostPopular(10, function(err, products){
        res.json(products)
    })
}));








module.exports = router
