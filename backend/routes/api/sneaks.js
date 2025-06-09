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

router.get('/most-popular', asyncHandler(async (req, res) => {
  const { limit = 4 } = req.query
  
  try {
    const products = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('API timeout'))
      }, 15000) // 15 second timeout
      
      sneaks.getMostPopular(parseInt(limit), (err, products) => {
        clearTimeout(timeout)
        if (err) {
          reject(err)
        } else {
          resolve(products || []) // Ensure we always return an array
        }
      })
    })

    // If we don't have enough products, supplement with some popular fallback shoes
    let finalProducts = [...(products || [])]
    
    if (finalProducts.length < parseInt(limit)) {
      const fallbackShoes = [
        {
          styleID: "DZ5485-612",
          shoeName: "Jordan 1 Retro High OG Chicago Lost and Found",
          brand: "Jordan",
          retailPrice: 245,
          thumbnail: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1664919066",
          resellPrice: 400,
          description: "The Air Jordan 1 Retro High OG 'Chicago Reimagined' puts a weathered spin on the iconic 'Chicago' colorway."
        },
        {
          styleID: "DD1391-100",
          shoeName: "Nike Dunk Low Retro White Black Panda",
          brand: "Nike",
          retailPrice: 110,
          thumbnail: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1606325289",
          resellPrice: 150,
          description: "The Nike Dunk Low Retro brings back the classic basketball shoe with a timeless white and black colorway."
        },
        {
          styleID: "DQ8426-061",
          shoeName: "Air Jordan 4 Retro Black Canvas",
          brand: "Jordan", 
          retailPrice: 210,
          thumbnail: "https://images.stockx.com/images/Air-Jordan-4-Retro-Military-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1652201023",
          resellPrice: 320,
          description: "The Air Jordan 4 Retro 'Black Canvas' delivers a monochromatic colorway built with mixed materials."
        },
        {
          styleID: "GX3542",
          shoeName: "Adidas Yeezy Boost 350 V2 Bone",
          brand: "Yeezy",
          retailPrice: 230,
          thumbnail: "https://via.placeholder.com/700x500/f7fafc/4a5568?text=Yeezy+350+V2",
          resellPrice: 280,
          description: "The adidas Yeezy Boost 350 V2 'Bone' showcases a neutral color palette on the brand's most popular silhouette."
        }
      ]

      // Add fallback shoes until we reach the desired limit
      const needed = parseInt(limit) - finalProducts.length
      finalProducts = [...finalProducts, ...fallbackShoes.slice(0, needed)]
    }

    res.json({ products: finalProducts.slice(0, parseInt(limit)) })
  } catch (error) {
    console.error('Most popular error:', error)
    
    // Fallback to hardcoded popular shoes if API fails completely
    const fallbackShoes = [
      {
        styleID: "DZ5485-612",
        shoeName: "Air Jordan 1 Retro High OG Chicago Reimagined",
        brand: "Jordan",
        retailPrice: 170,
        thumbnail: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1664919066",
        resellPrice: 400,
        description: "The Air Jordan 1 Retro High OG 'Chicago Reimagined' puts a weathered spin on the iconic 'Chicago' colorway."
      },
      {
        styleID: "DQ8426-061",
        shoeName: "Air Jordan 4 Retro Black Canvas",
        brand: "Jordan",
        retailPrice: 210,
        thumbnail: "https://images.stockx.com/images/Air-Jordan-4-Retro-Military-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1652201023",
        resellPrice: 320,
        description: "The Air Jordan 4 Retro 'Black Canvas' delivers a monochromatic colorway built with mixed materials."
      },
      {
        styleID: "FZ5808-061",
        shoeName: "Nike Dunk Low Retro White Black Panda",
        brand: "Nike",
        retailPrice: 110,
        thumbnail: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1606325289",
        resellPrice: 150,
        description: "The Nike Dunk Low Retro brings back the classic basketball shoe with a timeless white and black colorway."
      },
      {
        styleID: "GX3542",
        shoeName: "Adidas Yeezy Boost 350 V2 Bone",
        brand: "Yeezy",
        retailPrice: 230,
        thumbnail: "https://via.placeholder.com/700x500/f7fafc/4a5568?text=Yeezy+350+V2",
        resellPrice: 280,
        description: "The adidas Yeezy Boost 350 V2 'Bone' showcases a neutral color palette on the brand's most popular silhouette."
      }
    ]
    
    res.json({ products: fallbackShoes.slice(0, parseInt(limit)) })
  }
}))

module.exports = router
