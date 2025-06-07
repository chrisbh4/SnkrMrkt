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

            <Box>
              <Heading size="md" mb={4}>Retail Prices</Heading>
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
