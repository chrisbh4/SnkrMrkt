const express = require("express");
const asyncHandler = require("express-async-handler");

const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

/*
1. API data was rendering when placed outside of the router
    - I'm tryinng to have the SNKRs API be inside of my OWN API so when I input /api/snkrs/ : Then "Yeezy Cinder" data will show

*/
const router = express.Router();

//getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array

let products = sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
     // console.log("Sneaks API :" ,products)
     return products
    })

router.get('/', asyncHandler(async (req, res) => {
    console.log("----------------------------------")
    console.log(products)
    console.log("----------------------------------")
let products = "bob"

    return res.send(products)

}));


module.exports = router;
