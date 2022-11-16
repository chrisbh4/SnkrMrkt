const express = require("express");
const asyncHandler = require("express-async-handler");

// const SneaksAPI = require('sneaks-api');
// const sneaks = new SneaksAPI();

const StockXData = require("stockx-data");
const stockX = new StockXData();




const router = express.Router();



const bob = {
    name: 'Jordan 1 Retro High Clay Green',
    pid: '555088-135',
    image: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Clay-Green-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606318065',
    uuid: '70e1b854-e2ac-4c46-88da-446376d7fd4e',
    size: undefined,
    searchKey: 'Air-Jordan-1-Retro-High-Clay-Green',
    details: {
      retail: 160,
      releaseDate: '2018-05-01',
      colorway: 'Summit White/Clay Green-Black',
      brand: 'Jordan',
      type: 'Jordan 1 Retro High',
      gender: 'men',
      description: 'The Clay Green Air Jordan 1s are part of the all-MJ-everything Best Hand in the Game pack and will have any opponent fold immediately. These shoes come in a summit white, clay green and black colorway, offering another twist on the Air Jordan 1 Retro High OG "Black Toe." These Js feature a white and black-based upper with green suede accents and original "Nike Air" branding on the tongue tag. These dropped in May of 2018, where they were only available at select Jordan Brand retailers in North America. These are must-have for fans of the AJ 1 and the original G.O.A.T, Michael Jordan.'
    },
    market: {
      productId: 0,
      skuUuid: null,
      productUuid: '70e1b854-e2ac-4c46-88da-446376d7fd4e',
      lowestAsk: 548,
      lowestAskSize: null,
      parentLowestAsk: 540,
      numberOfAsks: 141,
      hasAsks: 1,
      salesThisPeriod: 2,
      salesLastPeriod: 0,
      highestBid: 550,
      highestBidSize: null,
      numberOfBids: 124,
      hasBids: 1,
      annualHigh: 1225,
      annualLow: 420,
      deadstockRangeLow: 486,
      deadstockRangeHigh: 684,
      volatility: 0.169153,
      deadstockSold: 261,
      pricePremium: 2.656,
      averageDeadstockPrice: 669,
      lastSale: 585,
      lastSaleSize: '10.5',
      salesLast72Hours: 2,
      changeValue: -308,
      changePercentage: -0.344905,
      absChangePercentage: 0.344905,
      totalDollars: 174636,
      updatedAt: 1668574035,
      lastLowestAskTime: 1668422652,
      lastHighestBidTime: 1668533614,
      lastSaleDate: '2022-11-15T21:29:12+00:00',
      createdAt: '2018-04-17T02:33:37+00:00',
      deadstockSoldRank: 90,
      pricePremiumRank: 66,
      averageDeadstockPriceRank: 14,
      featured: null,
      lowestAskFloat: 548,
      highestBidFloat: 550.6825
    },
    sizeMap: {
      '7': '6a897872-dce1-43d4-aad8-4a0f4fc3f105',
      '8': 'a44b4409-b271-4919-8689-6640be66ad68',
      '9': '7355968c-dec4-432a-a7bc-9f4cca4cdb3a',
      '10': 'bf8d9f5f-7d05-4231-bbc1-36b98d17c6cc',
      '11': 'd1257b2e-0513-44ce-81c3-ee336918301c',
      '12': '908a3ffb-876e-47cd-8857-32026a1a0c1c',
      '13': 'd60b2d0b-8c6b-4150-b4ea-24773ddf60b4',
      '14': '17733534-b5cd-46ae-ada9-77a3b50537a5',
      '15': '5b0a1796-d1b8-40f6-b96c-9bfd6195b5dc',
      '16': 'b0773efa-2240-4c3d-bf38-1c23fffca1e6',
      '17': 'cf66aace-a999-46d7-afd6-7139c0238436',
      '18': '07f0fc12-665d-4897-86b9-8846d5dee0cb',
      '7.5': 'f742a842-d048-4068-8db3-0fc2617624b3',
      '8.5': '6466cded-82e5-473d-8145-865016bf413a',
      '9.5': '8c4644ce-524d-499a-9c8f-10fcf2e384ae',
      '10.5': '63908b51-4fe1-4699-9be0-efb41f3750a2',
      '11.5': 'd565324c-30c1-4941-a76f-222d177abe6e',
      '12.5': 'af6863cf-f2db-4932-9bbd-8038795ba425'
    }
  }
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
        console.log(searchedProduct)
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
