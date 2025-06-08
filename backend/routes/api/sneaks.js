const express = require('express')
const asyncHandler = require('express-async-handler')
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()

const router = express.Router()

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


router.get('/', asyncHandler(async (req, res) => {
  res.json({ snks_api: 'no data found' })
}))


// router.get('/related-products', asyncHandler(async (req, res) => {
//   const box = []
//   //  * Optimized best for Multi single shoe search (Multiple Gender sizes) results in same shoe different genders
//   await stockX.searchProducts('Jordan 1 Clay Green').then((searchedProduct) => {
//     box.push(searchedProduct)
//   })

//   res.json({ snks_api: box })
// }))

router.get('/search', asyncHandler(async (req, res) => {
  const { query } = req.query
  if (!query) {
    return res.json({ products: [] })
  }

  try {
    const products = await new Promise((resolve, reject) => {
      sneaks.getProducts(query, 10, (err, products) => {
        if (err) reject(err)
        resolve(products)
      })
    })

    res.json({ products })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Failed to search products' })
  }
}))

router.get('/details', asyncHandler(async (req, res) => {
  const { styleId } = req.query
  if (!styleId) {
    return res.status(400).json({ error: 'Style ID is required' })
  }

  try {
    const product = await new Promise((resolve, reject) => {
      sneaks.getProductPrices(styleId, (err, product) => {
        if (err) reject(err)
        resolve(product)
      })
    })

    res.json({ product })
  } catch (error) {
    console.error('Product details error:', error)
    res.status(500).json({ error: 'Failed to fetch product details' })
  }
}))

module.exports = router
