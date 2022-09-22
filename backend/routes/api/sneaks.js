const express = require("express");
const asyncHandler = require("express-async-handler");

const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

/*
1. API data was rendering when placed outside of the router
    - I'm tryinng to have the SNKRs API be inside of my OWN API so when I input /api/snkrs/ : Then "Yeezy Cinder" data will show

*/
const router = express.Router();

/*

* getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array
sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
    console.log(products)
})

* Product object includes styleID where you input it in the getProductPrices function
* getProductPrices(styleID, callback) takes in a style ID and returns sneaker info including a price map and more images of the product
sneaks.getProductPrices("FY2903", function(err, product){
    console.log(product)
})
* getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
sneaks.getMostPopular(5, function(err, products){
    console.log(products)
})
*/
const searchSnkr = sneaks.getProducts("Yeezy Cinder", 1, function(err, products){
    console.log("Before :", products)
    const objPro =Object.values(products)[0]
    console.log("Func :", objPro.colorway)

    return objPro
})

// const MostPopular = sneaks.getMostPopular(1, function(err, products){
//     console.log(products)
//     return products
// });

// router.get('/most', asyncHandler( async ( req , res ) => {
//     console.log(products[0])
//     return await res.json(...MostPopular);
// }));


router.get('/', asyncHandler(async (req, res) => {
    console.log("SNKRS route :" , searchSnkr)
      return res.json(searchSnkr);
}));





module.exports = router;
