import React, { useEffect, useState } from 'react'
import {
  Grid,
  Center,
  GridItem,
  Box,
  VStack,
  Button,
  Text,
  Flex,
  SimpleGrid,
  Wrap,
  WrapItem,
  Container,
  Heading,
  Select,
  Skeleton,
  Badge,
  Image,
  useColorModeValue,
  Icon,
  Divider
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllShoes } from '../../store/shoes'
import ShoeList from '../OldHomePage/ShoeList'
import { getLoadFilters, getclearFilters, setSelectedFilters } from '../../store/filters'
import { FiFilter } from 'react-icons/fi'
import { MdSort } from 'react-icons/md'

function NewHomePage () {
  const dispatch = useDispatch()
  const shoes = useSelector((state) => state.shoes)
  const filters = useSelector((state) => state.filters)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('featured')

  let shoesArray
  if (localStorage.filtered_shoes) {
    shoesArray = JSON.parse(localStorage.getItem('filtered_shoes'))
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

  const sizeChart = [
    { id: 1, size: 3 },
    { id: 2, size: 3.5 },
    { id: 3, size: 4 },
    { id: 4, size: 4.5 },
    { id: 5, size: 5 },
    { id: 6, size: 5.5 },
    { id: 7, size: 6 },
    { id: 8, size: 6.5 },
    { id: 9, size: 7 },
    { id: 10, size: 7.5 },
    { id: 11, size: 8 },
    { id: 12, size: 8.5 },
    { id: 13, size: 9 },
    { id: 14, size: 9.5 },
    { id: 15, size: 10 },
    { id: 16, size: 10.5 },
    { id: 17, size: 11 },
    { id: 18, size: 11.5 },
    { id: 19, size: 12 },
    { id: 20, size: 12.5 },
    { id: 21, size: 13 },
    { id: 22, size: 13.5 },
    { id: 23, size: 14 },
    { id: 24, size: 14.5 },
    { id: 25, size: 15 }
  ]

  const brandsList = [
    { id: 1, title: 'Yeezy' },
    { id: 2, title: 'Air Jordan' },
    { id: 3, title: 'Adidas' },
    { id: 4, title: 'Nike' },
    { id: 5, title: 'New Balance' },
    { id: 6, title: 'Reebok' },
    { id: 7, title: 'Converse' },
    { id: 8, title: 'Puma' },
    { id: 9, title: 'Vans' },
    { id: 11, title: 'Gucci' }
  ]

  const [filterBrand, setFilterBrand] = useState({ id: null, brand: filters?.brand })
  const [filterShoeSize, setFilterShoeSize] = useState({ id: null, size: filters?.size })
  const [filterStyleType, setFilterStyleType] = useState({})
  const [filterPricing, setFilterPricing] = useState(filters?.price)

  const updateFilterBrand = (filter) => {
    if (filter.id === filterBrand.id) {
      setFilterBrand({})
    } else {
      setFilterBrand({ id: filter.id, brand: filter.title })
    }
  }

  const updateFilterShoeSize = (filter) => {
    if (filter.id === filterShoeSize.id) {
      setFilterShoeSize({})
    } else {
      setFilterShoeSize({ id: filter.id, size: filter.size })
    }
  }

  const updateFilterPricing = (value) => {
    if (value === filterPricing) {
      setFilterPricing('')
    } else {
      setFilterPricing(value)
    }
  }

  const payload = { brand: filterBrand.brand, size: filterShoeSize.size, style: filterStyleType, price: filterPricing }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await dispatch(getAllShoes())
      await dispatch(getLoadFilters(payload))
      setIsLoading(false)
    }
    loadData()
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(setSelectedFilters(payload))
    return data
  }

  const clearFilter = async (e) => {
    const data = await dispatch(getclearFilters())
    setFilterBrand({})
    setFilterShoeSize({})
    setFilterStyleType({})
    setFilterPricing('')
    return data
  }

  // Featured shoes - get 4 random shoes for the hero section
  const featuredShoes = sortedShoes.slice(0, 4)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="gray.50" py={8} mb={8}>
        <Container maxW="container.xl">
          <Heading mb={6} size="lg">Featured Sneakers</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {featuredShoes.map((shoe) => (
              <Box
                key={shoe.id}
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <Image src={shoe.image} alt={shoe.title} height="200px" width="100%" objectFit="cover" />
                <Box p={4}>
                  <Text fontWeight="bold" fontSize="lg" noOfLines={1}>{shoe.title}</Text>
                  <Badge colorScheme="blue" mt={2}>{shoe.brand}</Badge>
                  <Text mt={2} fontSize="xl" color="blue.500">${shoe.price}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: '1fr', md: '250px 1fr' }}
          gap={8}
        >
          {/* Filters Section */}
          <GridItem>
            <Box
              position="sticky"
              top="20px"
              bg={bgColor}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              p={4}
            >
              <Flex align="center" mb={4}>
                <Icon as={FiFilter} mr={2} />
                <Heading size="md">Filters</Heading>
              </Flex>

              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="semibold" mb={2}>Brands</Text>
                  {brandsList.map((brand) => (
                    <Button
                      key={brand.id}
                      size="sm"
                      variant={brand.id === filterBrand.id ? 'solid' : 'ghost'}
                      colorScheme={brand.id === filterBrand.id ? 'blue' : 'gray'}
                      onClick={() => updateFilterBrand(brand)}
                      mb={1}
                      width="100%"
                      justifyContent="flex-start"
                    >
                      {brand.title}
                    </Button>
                  ))}
                </Box>

                <Divider />

                <Box>
                  <Text fontWeight="semibold" mb={2}>Size</Text>
                  <SimpleGrid columns={4} spacing={2}>
                    {sizeChart.map((chart) => (
                      <Button
                        key={chart.id}
                        size="sm"
                        variant={chart.id === filterShoeSize.id ? 'solid' : 'outline'}
                        colorScheme={chart.id === filterShoeSize.id ? 'blue' : 'gray'}
                        onClick={() => updateFilterShoeSize(chart)}
                      >
                        {chart.size}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                <Divider />

                <Box>
                  <Text fontWeight="semibold" mb={2}>Price Range</Text>
                  <VStack spacing={2} align="stretch">
                    {['0-100', '200-300', '300-400', '400-650', '650+'].map((range) => (
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
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    width="full"
                    onClick={clearFilter}
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
