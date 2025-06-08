import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addShoeToCart } from '../../../store/shoppingCart'
import {
  Box,
  Button,
  Select,
  VStack,
  Text,
  useToast,
  HStack,
  Radio,
  RadioGroup
} from '@chakra-ui/react'

const sizeCharts = {
  mens: [
    { id: 1, size: 6 },
    { id: 2, size: 6.5 },
    { id: 3, size: 7 },
    { id: 4, size: 7.5 },
    { id: 5, size: 8 },
    { id: 6, size: 8.5 },
    { id: 7, size: 9 },
    { id: 8, size: 9.5 },
    { id: 9, size: 10 },
    { id: 10, size: 10.5 },
    { id: 11, size: 11 },
    { id: 12, size: 11.5 },
    { id: 13, size: 12 },
    { id: 14, size: 12.5 },
    { id: 15, size: 13 },
    { id: 16, size: 13.5 },
    { id: 17, size: 14 },
    { id: 18, size: 15 },
    { id: 19, size: 16 },
    { id: 20, size: 17 },
    { id: 21, size: 18 }
  ],
  womens: [
    { id: 1, size: 5 },
    { id: 2, size: 5.5 },
    { id: 3, size: 6 },
    { id: 4, size: 6.5 },
    { id: 5, size: 7 },
    { id: 6, size: 7.5 },
    { id: 7, size: 8 },
    { id: 8, size: 8.5 },
    { id: 9, size: 9 },
    { id: 10, size: 9.5 },
    { id: 11, size: 10 },
    { id: 12, size: 10.5 },
    { id: 13, size: 11 },
    { id: 14, size: 11.5 },
    { id: 15, size: 12 }
  ],
  youth: [
    { id: 1, size: 3.5 },
    { id: 2, size: 4 },
    { id: 3, size: 4.5 },
    { id: 4, size: 5 },
    { id: 5, size: 5.5 },
    { id: 6, size: 6 },
    { id: 7, size: 6.5 },
    { id: 8, size: 7 }
  ]
}

function AddToCartComponent({ sneaker }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const [sizeType, setSizeType] = useState('mens')
  const [size, setSize] = useState('')
  const cart = useSelector((state) => state.shoppingCart)
  const userId = useSelector((state) => state.session.user?.id || 0.5)

  // Calculate competitive Snkr Mrkt price that's better than competitors but still profitable
  const calculateSnkrMrktPrice = () => {
    const stockXPrice = sneaker.lowestResellPrice?.stockX || 0
    const goatPrice = sneaker.lowestResellPrice?.goat || 0
    const flightClubPrice = sneaker.lowestResellPrice?.flightClub || 0
    const retailPrice = sneaker.retailPrice || 0
    
    // Find the lowest competitor price from external APIs
    const competitorPrices = [stockXPrice, goatPrice, flightClubPrice].filter(price => price > 0)
    const lowestCompetitorPrice = competitorPrices.length > 0 ? Math.min(...competitorPrices) : retailPrice
    
    // Consider local marketplace pricing (estimated using retail price multiplier based on seeded data)
    const estimatedLocalPrice = retailPrice * 1.8 // Based on seeded price range analysis ($400-$750 vs retail)
    
    // Use the most relevant price for comparison
    const referencePrice = competitorPrices.length > 0 ? lowestCompetitorPrice : estimatedLocalPrice
    
    // More conservative discount: 3-8% instead of 5-15% to avoid being too aggressive
    const discountPercentage = 0.03 + (Math.random() * 0.05) // 3-8% discount
    const calculatedPrice = referencePrice * (1 - discountPercentage)
    
    // Higher minimum markup: retail + 35% instead of 20-25% to ensure better profit margins
    const minimumPrice = retailPrice * 1.35 // 35% markup from retail
    
    // Additional safety: don't go below 85% of competitor price to maintain market positioning
    const marketFloorPrice = referencePrice * 0.85
    
    // Use the highest minimum to ensure profitability and market position
    const finalMinimum = Math.max(minimumPrice, marketFloorPrice)
    
    // Ensure we don't go below our minimum profitable price
    return Math.max(calculatedPrice, finalMinimum)
  }

  const handleSizeTypeChange = (value) => {
    setSizeType(value)
    setSize('') // Reset size when changing size type
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }

  const addToCart = async () => {
    if (!size) {
      toast({
        title: 'Please select a size',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }

    // Use Snkr Mrkt competitive pricing
    const snkrMrktPrice = calculateSnkrMrktPrice()

    // Format the shoe data to match the cart structure
    const shoeData = {
      id: sneaker.styleID,
      title: sneaker.shoeName,
      price: snkrMrktPrice, // Use Snkr Mrkt competitive pricing
      shoeSize: `${sizeType.charAt(0).toUpperCase()}${sizeType.slice(1)} ${size}`, // Format as "Mens 10.5", "Womens 8", etc.
      image: sneaker.thumbnail
    }

    await dispatch(addShoeToCart(shoeData, cart))
    toast({
      title: 'Added to cart',
      description: 'The shoe has been added to your cart',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
    navigate('/home')
  }

  // Only show add to cart if user is logged in
  if (userId <= 0.99) {
    return (
      <Box p={4}>
        <Text color="red.500">Please log in to add items to cart</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={4} align="stretch" w="full" p={4}>
      <RadioGroup onChange={handleSizeTypeChange} value={sizeType}>
        <HStack spacing={6}>
          <Radio value="mens">Men's</Radio>
          <Radio value="womens">Women's</Radio>
          <Radio value="youth">Youth</Radio>
        </HStack>
      </RadioGroup>

      <Box>
        <Select
          placeholder={`Select ${sizeType.charAt(0).toUpperCase() + sizeType.slice(1)} Size`}
          value={size}
          onChange={handleSizeChange}
          bg="white"
        >
          {sizeCharts[sizeType].map((item) => (
            <option key={item.id} value={item.size}>
              {item.size}
            </option>
          ))}
        </Select>
      </Box>

      <Button
        colorScheme="blue"
        size="lg"
        onClick={addToCart}
        isDisabled={!size}
      >
        Add to Cart
      </Button>
    </VStack>
  )
}

export default AddToCartComponent
