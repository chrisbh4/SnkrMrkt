import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './ShoeDetails.css'
import { getOneShoe, getAllShoes } from '../../../store/shoes'
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
  const [selectedSize, setSelectedSize] = useState('') // Track selected size from AddToCartComponent
  const [isLoading, setIsLoading] = useState(false)

  // Move all useSelector calls to the top
  const allShoes = Object.values(useSelector((state) => state.shoes))
  const shoe = useSelector((state) => state.shoes[shoeId])
  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user?.id
    }
    return 0.5
  })

  useEffect(() => {
    // Prevent multiple simultaneous loads
    if (isLoading) return
    
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Load all shoes first to ensure we have the complete state
        await dispatch(getAllShoes())
        // Then load the specific shoe details
        await dispatch(getOneShoe(shoeId))
      } catch (error) {
        console.error('Error loading shoe data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
     // eslint-disable-next-line
  }, [dispatch, shoeId]) // Removed isLoading from dependencies to prevent infinite loops

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

  // Function to generate random shoes for related products
  function generateRandomShoes () {
    const randomNumbers = []
    // Add safety check to prevent infinite loops
    if (!allShoes || allShoes.length === 0) {
      return []
    }
    
    const maxShoes = Math.min(4, allShoes.length) // Don't try to get more shoes than available
    while (randomNumbers.length < maxShoes) {
      const num = Math.floor(Math.random() * allShoes.length)
      if (!randomNumbers.includes(num)) {
        randomNumbers.push(num)
      }
      // Safety break to prevent infinite loops
      if (randomNumbers.length >= allShoes.length) break
    }
    return randomNumbers
  }

  const randomShoeIndices = generateRandomShoes()
  const retailPrice = getRandomRetialPrice()

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const reviewBg = useColorModeValue('gray.50', 'gray.700')

  // Show loading state while shoe data is being fetched
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

  // Ensure we have all required shoe properties before rendering
  if (!shoe.title || !shoe.price || !shoe.brand) {
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
              <Badge colorScheme="green" mb={2}>{shoe?.brand || 'Loading...'}</Badge>
              <Heading size="lg" mb={2}>{shoe?.title || 'Loading...'}</Heading>
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
                  {shoe?.price ? currency(shoe.price).format() : 'Loading...'}
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  🏪 Available for immediate pickup from our local inventory
                </Text>
                <Text fontSize="xs" color="green.600" fontWeight="medium">
                  Size: {selectedSize || shoe?.shoeSize || 'N/A'} 
                  {selectedSize && shoe?.shoeSize && selectedSize !== shoe.shoeSize.toString() && (
                    <Text as="span" ml={2} color="orange.600" fontWeight="bold">
                      (Custom Size - Original: {shoe.shoeSize})
                    </Text>
                  )}
                  {" | Brand: " + (shoe?.brand || 'N/A')}
                </Text>
              </VStack>
            </Box>

            <Divider />

            <AddToCartComponent shoeId={shoeId} setSelectedSize={setSelectedSize} />

            <Divider />

            {/* Product Details */}
            <Box>
              <Heading size="md" mb={4}>Product Details</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Icon as={FiTag} color="blue.500" />
                    <Text fontWeight="bold">Current Price:</Text>
                    <Text>{shoe?.price ? currency(shoe.price).format() : 'Loading...'}</Text>
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
                    <Text>{shoe?.brand || 'Loading...'}</Text>
                  </HStack>
                </VStack>
              </Grid>
            </Box>

            <Divider />

            {/* Description */}
            <Box>
              <Heading size="md" mb={4}>Description</Heading>
              <Text color="gray.600" lineHeight="tall">
                {shoe?.description || 'Loading description...'}
              </Text>
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      {/* Related Products Section */}
      <Box mt={16}>
        <Heading size="xl" mb={8} textAlign="center">Related Products</Heading>
        {allShoes.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
            {randomShoeIndices.map(index => {
              const relatedShoe = allShoes[index]
              if (!relatedShoe) return null
              
              return (
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
                  <Link href={`/shoes/${relatedShoe.id}`}>
                    <Image
                      src={relatedShoe.image}
                      alt={relatedShoe.title}
                      w="100%"
                      h="200px"
                      objectFit="cover"
                    />
                    <Box p={4}>
                      <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                        {relatedShoe.title}
                      </Text>
                      <Badge colorScheme="blue" mt={2}>
                        {relatedShoe.brand}
                      </Badge>
                    </Box>
                  </Link>
                </Box>
              )
            })}
          </SimpleGrid>
        ) : (
          <Text textAlign="center" color="gray.500">
            Loading related products...
          </Text>
        )}
      </Box>

      {/* Reviews Section */}
      <Box mt={16}>
        <Heading size="xl" mb={8} textAlign="center">{shoe?.title || 'Shoe'} Reviews</Heading>
        
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
            {shoe?.Reviews?.length > 0 ? (
              shoe.Reviews.map((review) => (
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
              ))
            ) : (
              <Text textAlign="center" color="gray.500">
                No reviews yet. Be the first to review this shoe!
              </Text>
            )}
          </VStack>
        </Box>
      </Box>
    </Container>
  )
}

export default ShoeDetialsChakra
