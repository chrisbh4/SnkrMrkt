import React, { useEffect, useState } from 'react'
import {
  Grid,
  GridItem,
  Box,
  VStack,
  Button,
  Text,
  Flex,
  SimpleGrid,
  WrapItem,
  Container,
  Select,
  Skeleton,
  Badge,
  Image,
  Heading,
  useColorModeValue,
  Icon,
  Divider
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllShoes } from '../../store/shoes'
import ShoeList from '../OldHomePage/ShoeList'
import { getclearFilters, setSelectedFilters } from '../../store/filters'
import { fetchMostPopularShoes } from '../../store/stockX'
import { FiFilter, FiTrendingUp } from 'react-icons/fi'
import { MdSort } from 'react-icons/md'
import currency from 'currency.js'

function NewHomePage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shoes = useSelector((state) => state.shoes)
  const filters = useSelector((state) => state.filters)
  const mostPopular = useSelector((state) => state.stockXapi.mostPopular)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPopular, setIsLoadingPopular] = useState(true)
  const [sortBy, setSortBy] = useState('featured')
  const [selectedSizeCategory, setSelectedSizeCategory] = useState('men')

  // Use filtered shoes if available, otherwise use all shoes
  let shoesArray
  if (filters.isFiltered && filters.filteredShoes) {
    shoesArray = Object.values(filters.filteredShoes)
  } else if (localStorage.filtered_shoes) {
    shoesArray = JSON.parse(localStorage.getItem('filtered_shoes'))
    shoesArray = Object.values(shoesArray)
  } else {
    shoesArray = Object.values(shoes)
  }

  // Sort shoes based on selected option
  const sortedShoes = [...shoesArray].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.title.localeCompare(b.title)
      case 'name-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  const sizeCharts = {
    men: [
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
      { id: 18, size: 14.5 },
      { id: 19, size: 15 }
    ],
    women: [
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
      { id: 1, size: '3Y' },
      { id: 2, size: '3.5Y' },
      { id: 3, size: '4Y' },
      { id: 4, size: '4.5Y' },
      { id: 5, size: '5Y' },
      { id: 6, size: '5.5Y' },
      { id: 7, size: '6Y' },
      { id: 8, size: '6.5Y' },
      { id: 9, size: '7Y' }
    ]
  }

  const brandsList = [
    { id: 1, title: 'Yeezy' },
    { id: 2, title: 'Air-Jordan' },
    { id: 3, title: 'Adidas' },
    { id: 4, title: 'Nike' },
    { id: 5, title: 'New Balance' },
    { id: 6, title: 'Reebok' },
    { id: 7, title: 'Converse' },
    { id: 8, title: 'Puma' },
    { id: 9, title: 'Vans' },
    { id: 11, title: 'Gucci' }
  ]

  const [filterBrand, setFilterBrand] = useState('')
  const [filterShoeSize, setFilterShoeSize] = useState('')
  const [filterPricing, setFilterPricing] = useState('')

  const updateFilterBrand = (filter) => {
    if (filter.title === filterBrand) {
      setFilterBrand('')
    } else {
      setFilterBrand(filter.title)
    }
  }

  const updateFilterShoeSize = (size) => {
    if (size.size === filterShoeSize) {
      setFilterShoeSize('')
    } else {
      setFilterShoeSize(size.size)
    }
  }

  const updateFilterPricing = (value) => {
    if (value === filterPricing) {
      setFilterPricing('')
    } else {
      setFilterPricing(value)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setIsLoadingPopular(true)
      
      // Load both regular shoes and most popular
      await Promise.all([
        dispatch(getAllShoes()),
        dispatch(fetchMostPopularShoes(4))
      ])
      
      setIsLoading(false)
      setIsLoadingPopular(false)
    }
    loadData()
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const payload = { 
      brand: filterBrand, 
      size: filterShoeSize, 
      price: filterPricing 
    }
    
    const result = await dispatch(setSelectedFilters(payload))
    
    if (result.success) {
      console.log('Filters applied successfully')
    } else {
      console.error('Filter error:', result.error)
    }
    
    setIsLoading(false)
  }

  const clearFilter = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    await dispatch(getclearFilters())
    setFilterBrand('')
    setFilterShoeSize('')
    setFilterPricing('')
    
    // Refresh all shoes
    await dispatch(getAllShoes())
    setIsLoading(false)
  }

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" pt="60px">
      <Container maxW="7xl" py={8}>
        {/* Most Popular Section */}
        <Box mb={8}>
          <Flex align="center" mb={6}>
            <Icon as={FiTrendingUp} mr={3} color="orange.500" boxSize={6} />
            <Heading size="lg" color="gray.800">Most Popular</Heading>
            <Badge ml={3} colorScheme="orange" variant="subtle">Trending</Badge>
          </Flex>
          
          {isLoadingPopular ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height="320px" borderRadius="xl" />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {(mostPopular && Array.isArray(mostPopular) ? mostPopular : []).slice(0, 4).map((shoe, index) => (
                <Box
                  key={shoe?.styleID || index}
                  bg={bgColor}
                  borderRadius="xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  shadow="sm"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'lg',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/sneaker/${shoe.styleID}`)}
                >
                  <Box position="relative" height="200px">
                    <Image
                      src={shoe.thumbnail}
                      alt={shoe.shoeName}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/400x300/f7fafc/718096?text=Sneaker+Image"
                      onError={(e) => {
                        console.log(`Failed to load image for ${shoe.shoeName}:`, shoe.thumbnail)
                        // Set fallback if the main fallback also fails
                        e.target.src = "https://via.placeholder.com/400x300/f7fafc/718096?text=No+Image"
                      }}
                      loading="lazy"
                    />
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme="orange"
                      variant="solid"
                      borderRadius="full"
                      fontSize="xs"
                      px={2}
                      py={1}
                    >
                      Popular
                    </Badge>
                  </Box>
                  
                  <VStack align="stretch" p={4} spacing={2}>
                    <Text fontSize="md" fontWeight="bold" noOfLines={2} color="gray.800">
                      {shoe.shoeName || 'Unknown Shoe'}
                    </Text>
                    <Badge colorScheme="blue" alignSelf="flex-start" size="sm">
                      {shoe.brand || 'Unknown Brand'}
                    </Badge>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="lg" color="green.600" fontWeight="semibold">
                        {shoe.retailPrice ? currency(shoe.retailPrice).format() : 'N/A'}
                      </Text>
                      {shoe.resellPrice && (
                        <Text fontSize="sm" color="gray.500">
                          Resell: {currency(shoe.resellPrice).format()}
                        </Text>
                      )}
                    </Flex>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Divider mb={8} />

        <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} gap={8}>
          {/* Filters Sidebar */}
          <GridItem>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              shadow="sm"
              position="sticky"
              top="80px"
              maxH="calc(100vh - 100px)"
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: useColorModeValue('#CBD5E0', '#4A5568'),
                  borderRadius: '24px',
                },
              }}
            >
              <VStack spacing={6} align="stretch">
                <Flex align="center">
                  <Icon as={FiFilter} mr={2} />
                  <Text fontSize="lg" fontWeight="bold">Filters</Text>
                </Flex>

                <Divider />

                <Box>
                  <Text fontWeight="semibold" mb={3}>Brand</Text>
                  <VStack spacing={2} align="stretch">
                    {brandsList.map((brand) => (
                      <Button
                        key={brand.id}
                        size="sm"
                        variant={filterBrand === brand.title ? 'solid' : 'ghost'}
                        colorScheme={filterBrand === brand.title ? 'blue' : 'gray'}
                        onClick={() => updateFilterBrand(brand)}
                        justifyContent="flex-start"
                      >
                        {brand.title}
                      </Button>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Text fontWeight="semibold" mb={3}>Size</Text>
                  <VStack spacing={3} align="stretch">
                    <Flex gap={2}>
                      {['men', 'women', 'youth'].map((category) => (
                        <Button
                          key={category}
                          size="xs"
                          variant={selectedSizeCategory === category ? 'solid' : 'outline'}
                          colorScheme={selectedSizeCategory === category ? 'blue' : 'gray'}
                          onClick={() => setSelectedSizeCategory(category)}
                          textTransform="capitalize"
                          flex={1}
                        >
                          {category}
                        </Button>
                      ))}
                    </Flex>

                    <SimpleGrid columns={4} spacing={2}>
                      {sizeCharts[selectedSizeCategory].map((chart) => (
                        <Button
                          key={chart.id}
                          size="sm"
                          variant={chart.size === filterShoeSize ? 'solid' : 'outline'}
                          colorScheme={chart.size === filterShoeSize ? 'blue' : 'gray'}
                          onClick={() => updateFilterShoeSize(chart)}
                        >
                          {chart.size}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Text fontWeight="semibold" mb={2}>Price Range</Text>
                  <VStack spacing={2} align="stretch">
                    {['0-100', '100-200', '200-300', '300-400', '400-650', '650+'].map((range) => (
                      <Button
                        key={range}
                        size="sm"
                        variant={filterPricing === range ? 'solid' : 'ghost'}
                        colorScheme={filterPricing === range ? 'blue' : 'gray'}
                        onClick={() => updateFilterPricing(range)}
                        justifyContent="flex-start"
                      >
                        ${range}
                      </Button>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Flex gap={2}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    width="full"
                    onClick={onSubmit}
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    width="full"
                    onClick={clearFilter}
                    isLoading={isLoading}
                  >
                    Clear
                  </Button>
                </Flex>
              </VStack>
            </Box>
          </GridItem>

          {/* Products Grid */}
          <GridItem>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="semibold">
                {sortedShoes.length} Products
                {filters.isFiltered && (
                  <Badge ml={2} colorScheme="blue">Filtered</Badge>
                )}
              </Text>
              <Flex align="center">
                <Icon as={MdSort} mr={2} />
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="sm"
                  width="200px"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </Select>
              </Flex>
            </Flex>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} height="300px" borderRadius="lg" />
                ))}
              </SimpleGrid>
            ) : sortedShoes.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text fontSize="lg" color="gray.500">
                  No shoes found matching your filters.
                </Text>
                <Button mt={4} colorScheme="blue" onClick={clearFilter}>
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                {sortedShoes.map((shoe) => (
                  <WrapItem key={shoe.id}>
                    <ShoeList shoe={shoe} />
                  </WrapItem>
                ))}
              </SimpleGrid>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default NewHomePage
