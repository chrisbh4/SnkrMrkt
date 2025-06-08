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

    // First, try to get shoes from local database (for seeded data)
    // Convert styleIDs to integers in case they match local shoe IDs
    const potentialShoeIds = order.shoeIds
      .map(id => parseInt(id, 10))
      .filter(id => !isNaN(id))

    let localShoes = []
    if (potentialShoeIds.length > 0) {
      localShoes = await Shoe.findAll({
        where: {
          id: {
            [Op.in]: potentialShoeIds
          }
        }
      })
    }

    // Create a map of local shoes by ID for quick lookup
    const localShoesMap = new Map()
    localShoes.forEach(shoe => {
      localShoesMap.set(shoe.id.toString(), shoe)
    })

    // Process each styleID/shoeId
    const sneakerDataPromises = order.shoeIds.map(async (shoeIdentifier) => {
      // Check if this identifier exists in local database first
      const localShoe = localShoesMap.get(shoeIdentifier)
      
      let baseData = {
        styleID: shoeIdentifier,
        thumbnail: null,
        title: `Product ${shoeIdentifier}`,
        price: 'N/A',
        source: 'unknown'
      }

      // If we have local data, use it as the base
      if (localShoe) {
        baseData = {
          styleID: shoeIdentifier,
          thumbnail: localShoe.image,
          title: localShoe.title,
          price: localShoe.price,
          brand: localShoe.brand,
          description: localShoe.description,
          source: 'local'
        }
      }

      // Try to enhance with Sneaks API data
      try {
        const productDetails = await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.log(`Timeout getting prices for styleID: ${shoeIdentifier}`)
            resolve(null)
          }, 8000)
          
          sneaks.getProductPrices(shoeIdentifier, (err, product) => {
            clearTimeout(timeout)
            if (err) {
              console.error(`Error getting prices for styleID ${shoeIdentifier}:`, err.message)
              resolve(null)
            } else {
              resolve(product)
            }
          })
        })

        if (productDetails) {
          // Merge Sneaks API data with local data (Sneaks API takes priority for pricing)
          return {
            styleID: shoeIdentifier,
            thumbnail: productDetails.thumbnail || baseData.thumbnail,
            title: productDetails.shoeName || baseData.title,
            price: productDetails.retailPrice || productDetails.resellPrices?.stockX || productDetails.resellPrices?.goat || baseData.price,
            brand: baseData.brand || productDetails.brand,
            description: baseData.description,
            source: localShoe ? 'local_enhanced' : 'sneaks_api'
          }
        } else {
          // Use base data (either local or fallback)
          return baseData
        }
      } catch (error) {
        console.error(`Error fetching sneaker data for styleID ${shoeIdentifier}:`, error.message)
        // Return base data on error
        return baseData
      }
    })

    // Wait for all sneaker data to be fetched
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
