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
  useColorModeValue,
  Icon,
  Divider
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllShoes } from '../../store/shoes'
import ShoeList from '../OldHomePage/ShoeList'
import { getclearFilters, setSelectedFilters } from '../../store/filters'
import { FiFilter } from 'react-icons/fi'
import { MdSort } from 'react-icons/md'

function NewHomePage () {
  const dispatch = useDispatch()
  const shoes = useSelector((state) => state.shoes)
  const filters = useSelector((state) => state.filters)
  const [isLoading, setIsLoading] = useState(true)
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
      await dispatch(getAllShoes())
      setIsLoading(false)
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
                    Apply Filters
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    width="full"
                    onClick={clearFilter}
                    isLoading={isLoading}
                  >
                    Clear All
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
