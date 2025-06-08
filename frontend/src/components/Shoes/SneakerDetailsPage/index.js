import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSneakerDetails } from '../../../store/stockX'
import AddToCartComponent from './AddToCartComponent'
import {
  Box,
  Container,
  Image,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Heading,
  Badge,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Skeleton
} from '@chakra-ui/react'

function SneakerDetailsPage() {
  const dispatch = useDispatch()
  const { styleId } = useParams()
  const sneaker = useSelector((state) => state.stockXapi.currentSneaker)

  useEffect(() => {
    dispatch(getSneakerDetails(styleId))
  }, [dispatch, styleId])

  if (!sneaker) {
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

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

  const snkrMrktPrice = calculateSnkrMrktPrice()

  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
        <GridItem>
          <Box position="sticky" top="20px">
            <Image
              src={sneaker.thumbnail}
              alt={sneaker.shoeName}
              w="100%"
              h="auto"
              objectFit="contain"
              borderRadius="lg"
            />
          </Box>
        </GridItem>

        <GridItem>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Badge colorScheme="green" mb={2}>{sneaker.brand}</Badge>
              <Heading size="lg">{sneaker.shoeName}</Heading>
              <Text color="gray.500" mt={2}>Style ID: {sneaker.styleID}</Text>
            </Box>

            <Divider />

            {/* Snkr Mrkt Price Section - Prominently displayed */}
            <Box 
              bg="blue.50" 
              borderRadius="lg" 
              p={6} 
              border="2px solid" 
              borderColor="blue.200"
            >
              <VStack spacing={3} align="center">
                <Badge colorScheme="blue" fontSize="lg" px={4} py={2}>
                  🏆 SNKR MRKT PRICE
                </Badge>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                  {formatPrice(snkrMrktPrice)}
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                💰 No hidden fees compared to other retailers
                </Text>
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>Competitor Prices</Heading>
              <StatGroup>
                <Stat>
                  <StatLabel>StockX</StatLabel>
                  <StatNumber>{formatPrice(sneaker.lowestResellPrice?.stockX || 0)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>GOAT</StatLabel>
                  <StatNumber>{formatPrice(sneaker.lowestResellPrice?.goat || 0)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Flight Club</StatLabel>
                  <StatNumber>{formatPrice(sneaker.lowestResellPrice?.flightClub || 0)}</StatNumber>
                </Stat>
              </StatGroup>
            </Box>

            <Divider />

            <AddToCartComponent sneaker={sneaker} />

            <Divider />

            <Box>
              <Heading size="md" mb={4}>Product Details</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <HStack>
                  <Text fontWeight="bold">Colorway:</Text>
                  <Text>{sneaker.colorway}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Release Date:</Text>
                  <Text>{new Date(sneaker.releaseDate).toLocaleDateString()}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Retail Price:</Text>
                  <Text>{formatPrice(sneaker.retailPrice)}</Text>
                </HStack>
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>Description</Heading>
              <Text>{sneaker.description}</Text>
            </Box>

            {sneaker.resellLinks && (
              <>
                <Divider />
                <Box>
                  <Heading size="md" mb={4}>Buy Now</Heading>
                  <HStack spacing={4}>
                    {sneaker.resellLinks.stockX && (
                      <Badge as="a" href={sneaker.resellLinks.stockX} target="_blank" colorScheme="green" p={2}>
                        StockX
                      </Badge>
                    )}
                    {sneaker.resellLinks.goat && (
                      <Badge as="a" href={sneaker.resellLinks.goat} target="_blank" colorScheme="purple" p={2}>
                        GOAT
                      </Badge>
                    )}
                    {sneaker.resellLinks.flightClub && (
                      <Badge as="a" href={sneaker.resellLinks.flightClub} target="_blank" colorScheme="blue" p={2}>
                        Flight Club
                      </Badge>
                    )}
                  </HStack>
                </Box>
              </>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default SneakerDetailsPage
