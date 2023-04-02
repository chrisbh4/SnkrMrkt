const express = require("express");
const asyncHandler = require("express-async-handler");

// const SneaksAPI = require('sneaks-api');
// const sneaks = new SneaksAPI();

const StockXData = require("stockx-data");
const stockX = new StockXData();




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



// router.get('/', asyncHandler(async (req, res) => {
//     await sneaks.getProducts("Yeezy Cinder", 1, function (err, products) {
//         // const objPro =Object.values(products)[0]
//         // console.log("Func :", objPro.releaseDate)
//         // console.log("Prod :", products)
//         console.log("error :", err)
//         console.log("products : ", products)
//         res.json({"OK": products[0].description});

//     })
// }));

// // router.get('/most-popular', asyncHandler(async (req, res) => {
// router.get('/most', asyncHandler(async (req, res) => {
//     await sneaks.getMostPopular(10, function(err, products){
//         console.log(products)

//         res.json({"most_popular": products})
//     })
// }));

router.get('/', asyncHandler(async (req, res) => {
    let box = []
    //  * Optimized best for Multi single shoe search (Multiple Gender sizes) results in same shoe different genders
    await stockX.searchProducts("Jordan 1 Clay Green").then((searchedProduct) => {
        box.push(searchedProduct)

      });

      res.json({"snks_api" : box})
}));


router.get('/single', asyncHandler(async (req, res) => {
    let box = []

    //  * Optimized best for Single shoe search
    await stockX.searchProducts("Jordan 1 Clay Green").then(async (searchedProduct) => {
        await stockX.fetchProductDetails(searchedProduct[0]).then((productDetails) => {
          box.push([productDetails])
        });
    })

    res.json({"snks_api" : box})
}));


router.get('/related-products', asyncHandler(async (req, res) => {
    let box = []
    //  * Optimized best for Multi single shoe search (Multiple Gender sizes) results in same shoe different genders
    await stockX.searchProducts("Jordan 1 Clay Green").then((searchedProduct) => {
        box.push(searchedProduct)

      });

      res.json({"snks_api" : box})
}));





module.exports = router;
