const express = require('express')
const asyncHandler = require('express-async-handler')
const { Shoe, User, Orders } = require('../../db/models')
const { Op } = require('sequelize')
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()
const router = express.Router()

router.get('/:id/selling', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [Shoe]
  })
  return res.send(user)
}))

router.get('/:id/orders', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [Orders]
  })
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  //* Worst case I can remove the Promise and just display the Order data without Shoe Images    
    /*
      *(Idea): update the Order's model to take in an array of Objects(Sneaks) 
      {
        styleID,
        thumnail_image,
        price
      }
    */
  // Process each order to get sneaker data from API


  return res.json({ user })
}))

router.get('/:id/watching', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [Shoe]
  })
  return res.json({ user })
}))

// New endpoint for fetching detailed order summary with sneaks API
router.get('/:userId/orders/:orderId/summary', asyncHandler(async (req, res) => {
  const { userId, orderId } = req.params
  
  try {
    // Find the specific order for the user
    const order = await Orders.findOne({
      where: {
        id: orderId,
        buyerId: userId
      }
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Check if order has shoeIds and it's an array
    if (!order.shoeIds || !Array.isArray(order.shoeIds) || order.shoeIds.length === 0) {
      return res.json({
        order: {
          ...order.toJSON(),
          sneakers: []
        }
      })
    }

    // Fetch sneaker data directly using styleIDs from the shoeIds array
    const sneakerDataPromises = order.shoeIds.map(async (styleID) => {
      try {
        // Get product details directly using styleID with timeout
        const productDetails = await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.log(`Timeout getting prices for styleID: ${styleID}`)
            resolve(null)
          }, 8000)
          
          sneaks.getProductPrices(styleID, (err, product) => {
            clearTimeout(timeout)
            if (err) {
              console.error(`Error getting prices for styleID ${styleID}:`, err.message)
              resolve(null)
            } else {
              resolve(product)
            }
          })
        })

        if (productDetails) {
          // Return only the requested fields: thumbnail, price, and title
          return {
            styleID: styleID,
            thumbnail: productDetails.thumbnail,
            title: productDetails.shoeName,
            price: productDetails.retailPrice || productDetails.resellPrices?.stockX || productDetails.resellPrices?.goat || 'N/A'
          }
        } else {
          // Fallback if API call fails
          return {
            styleID: styleID,
            thumbnail: null,
            title: `Product ${styleID}`,
            price: 'N/A'
          }
        }
      } catch (error) {
        console.error(`Error fetching sneaker data for styleID ${styleID}:`, error.message)
        // Fallback for individual failures
        return {
          styleID: styleID,
          thumbnail: null,
          title: `Product ${styleID}`,
          price: 'N/A'
        }
      }
    })

    // Wait for all sneaker data to be fetched (with individual timeouts)
    const sneakerData = await Promise.allSettled(sneakerDataPromises)
    const resolvedSneakers = sneakerData.map(result => 
      result.status === 'fulfilled' ? result.value : null
    ).filter(Boolean)

    const orderWithSneakers = {
      ...order.toJSON(),
      sneakers: resolvedSneakers
    }

    return res.json({ order: orderWithSneakers })

  } catch (error) {
    console.error(`Error fetching order summary for order ${orderId}:`, error)
    return res.status(500).json({ 
      message: 'Error fetching order summary', 
      error: error.message 
    })
  }
}))

module.exports = router
