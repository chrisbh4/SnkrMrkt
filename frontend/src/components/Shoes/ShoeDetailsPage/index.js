import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './ShoeDetails.css'
import { getOneShoe } from '../../../store/shoes'
import AddToCartComponent from './AddToCartCompoent'
import CreateReviewModal from '../../Reviews/NewReview/ModalForm'
import EditReviewModal from '../../Reviews/EditReview/ModalForm'
import currency from 'currency.js'
import {
  Container,
  Box,
  Text,
  Flex,
  Image,
  Link,
  Grid,
  GridItem,
  VStack,
  HStack,
  Badge,
  Heading,
  Divider,
  SimpleGrid,
  Skeleton,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { FiStar, FiCalendar, FiTag, FiPackage } from 'react-icons/fi'

function ShoeDetialsChakra () {
  const dispatch = useDispatch()
  const params = useParams()
  const shoeId = params.id

  useEffect(() => {
    dispatch(getOneShoe(shoeId))
  }, [dispatch, shoeId])

  const getRandomRetialPrice = () => {
    const randomNumber = Math.random() < 0.5 ? 180 : 220
    return randomNumber
  }

  const getRandomDate = () => {
    const startDate = new Date('2018-05-20')
    const endDate = new Date('2022-12-25')
    const startTimestamp = startDate.getTime()
    const endTimestamp = endDate.getTime()
    const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp)
    const randomDate = new Date(randomTimestamp)
    const formattedDate = `${randomDate.getMonth() + 1}/${randomDate.getDate()}/${randomDate.getFullYear()}`
    return formattedDate
  }

  // Calculate competitive Snkr Mrkt price
  const calculateSnkrMrktPrice = (currentPrice, retailPrice) => {
    const retail = retailPrice || getRandomRetialPrice()
    const current = currentPrice || retail * 1.5
    
    // Incorporate local marketplace data for competitive analysis
    // Check if we have access to other local shoes pricing for market comparison
    const localShoesData = allShoes.filter(s => s && s.price && s.id !== shoeId)
    const localPrices = localShoesData.map(s => s.price).filter(p => p > 0)
    
    // Calculate average local market price for reference
    const avgLocalPrice = localPrices.length > 0 
      ? localPrices.reduce((sum, price) => sum + parseFloat(price), 0) / localPrices.length
      : current
    
    // Find comparable price range from local data (similar price tier)
    const priceRange = current * 0.25 // 25% price range for more precise comparison
    const comparableLocalShoes = localPrices.filter(price => 
      Math.abs(parseFloat(price) - current) <= priceRange
    )
    const avgComparablePrice = comparableLocalShoes.length > 0
      ? comparableLocalShoes.reduce((sum, price) => sum + parseFloat(price), 0) / comparableLocalShoes.length
      : avgLocalPrice
    
    // Use the most competitive reference price (current, average local, or comparable local)
    const referencePrice = Math.min(current, avgComparablePrice)
    
    // More conservative pricing: 3-8% discount instead of 8-18%
    // This ensures we're competitive but not too aggressive with pricing
    const discountPercentage = 0.03 + (Math.random() * 0.05) // 3-8% discount
    const calculatedPrice = referencePrice * (1 - discountPercentage)
    
    // Higher minimum markup: retail + 35% instead of 25% to ensure better profit margins
    const minimumPrice = retail * 1.35 // 35% markup from retail to ensure good profit
    
    // Additional safety check: don't go below 85% of current market price
    const marketFloorPrice = current * 0.85
    
    // Use the highest of all minimum prices to ensure profitability
    const finalMinimum = Math.max(minimumPrice, marketFloorPrice)
    
    // Ensure we don't go below our minimum profitable price
    return Math.max(calculatedPrice, finalMinimum)
  }

  // Function to generate random shoes for related products
  const allShoes = Object.values(useSelector((state) => state.shoes))

  function generateRandomShoes () {
    const randomNumbers = []
    if (allShoes.length > 0) {
      while (randomNumbers.length < 4) {
        const num = Math.floor(Math.random() * Object.values(allShoes).length)
        if (!randomNumbers.includes(num)) {
          randomNumbers.push(num)
        }
      }
    }
    return randomNumbers
  }

  const randomShoeIndices = generateRandomShoes()

  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user?.id
    }
    return 0.5
  })

  const shoe = useSelector((state) => state.shoes[shoeId])
  const retailPrice = getRandomRetialPrice()
  const snkrMrktPrice = shoe ? calculateSnkrMrktPrice(shoe.price, retailPrice) : 0

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const reviewBg = useColorModeValue('gray.50', 'gray.700')

  if (!shoe) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Skeleton height="400px" />
          <Skeleton height="200px" />
          <Skeleton height="200px" />
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
        {/* Image Section */}
        <GridItem>
          <Box>
            <Image
              src={shoe.image}
              alt={shoe.title}
              w="100%"
              h="auto"
              objectFit="contain"
              borderRadius="lg"
              shadow="lg"
            />
          </Box>
        </GridItem>

        {/* Product Details Section */}
        <GridItem>
          <VStack align="stretch" spacing={6}>
            {/* Title and Brand */}
            <Box>
              <Badge colorScheme="green" mb={2}>{shoe.brand}</Badge>
              <Heading size="lg" mb={2}>{shoe.title}</Heading>
            </Box>

            <Divider />

            {/* Snkr Mrkt Price Section */}
            <Box 
              bg="green.50" 
              borderRadius="lg" 
              p={6} 
              border="2px solid" 
              borderColor="green.200"
            >
              <VStack spacing={3} align="center">
                <Badge colorScheme="green" fontSize="lg" px={4} py={2}>
                  🎯 SNKR MRKT PRICE
                </Badge>
                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                  {currency(shoe.price).format()}
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  🏪 Available for immediate pickup from our local inventory
                </Text>
                <Text fontSize="xs" color="green.600" fontWeight="medium">
                  Size: {shoe.shoeSize} | Brand: {shoe.brand}
                </Text>
              </VStack>
            </Box>

            <Divider />

            <AddToCartComponent shoeId={shoeId} />

            <Divider />

            {/* Product Details */}
            <Box>
              <Heading size="md" mb={4}>Product Details</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Icon as={FiTag} color="blue.500" />
                    <Text fontWeight="bold">Current Price:</Text>
                    <Text>{currency(shoe.price).format()}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiPackage} color="green.500" />
                    <Text fontWeight="bold">Retail Price:</Text>
                    <Text>{currency(retailPrice).format()}</Text>
                  </HStack>
                </VStack>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Icon as={FiCalendar} color="purple.500" />
                    <Text fontWeight="bold">Release Date:</Text>
                    <Text>{getRandomDate()}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiStar} color="orange.500" />
                    <Text fontWeight="bold">Brand:</Text>
                    <Text>{shoe.brand}</Text>
                  </HStack>
                </VStack>
              </Grid>
            </Box>

            <Divider />

            {/* Description */}
            <Box>
              <Heading size="md" mb={4}>Description</Heading>
              <Text color="gray.600" lineHeight="tall">
                {shoe.description}
              </Text>
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      {/* Related Products Section */}
      <Box mt={16}>
        <Heading size="xl" mb={8} textAlign="center">Related Products</Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
          {randomShoeIndices.map(index => (
            <Box
              key={index}
              bg={bgColor}
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor={borderColor}
              shadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'xl'
              }}
            >
              <Link href={`/shoes/${allShoes[index]?.id}`}>
                <Image
                  src={allShoes[index]?.image}
                  alt={allShoes[index]?.title}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                    {allShoes[index]?.title}
                  </Text>
                  <Badge colorScheme="blue" mt={2}>
                    {allShoes[index]?.brand}
                  </Badge>
                </Box>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Reviews Section */}
      <Box mt={16}>
        <Heading size="xl" mb={8} textAlign="center">{shoe.title} Reviews</Heading>
        
        <Box mb={8} textAlign="center">
          <CreateReviewModal />
        </Box>

        <Box bg={bgColor} borderRadius="lg" p={6} borderWidth="1px" borderColor={borderColor}>
          <Grid templateColumns="repeat(2, 1fr)" gap={8} mb={6}>
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Reviews
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Ratings
            </Text>
          </Grid>

          <VStack spacing={4} align="stretch">
            {shoe.Reviews?.map((review) => (
              <Box 
                key={review.id} 
                p={4} 
                bg={reviewBg} 
                borderRadius="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Grid templateColumns="2fr 1fr 1fr" gap={6} alignItems="center">
                  <Text color="gray.700">{review.comment}</Text>
                  <Flex align="center">
                    <Text fontWeight="semibold" mr={1}>{review.rating}</Text>
                    <Icon as={FiStar} color="yellow.400" />
                  </Flex>
                  <Box>
                    {review.userId === userId && (
                      <EditReviewModal review={review} />
                    )}
                  </Box>
                </Grid>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Container>
  )
}

export default ShoeDetialsChakra
