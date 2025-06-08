import { Box, Image, Text, Badge, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchByExactName } from '../../store/stockX'
import currency from 'currency.js'

function ShoeList ({ shoe }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  let imageCheck
  if (shoe.image.includes('jpg') || shoe.image.includes('jpeg') || shoe.image.includes('png') || shoe.image.includes('image')) {
    imageCheck = <Image
      src={shoe.image}
      alt={shoe.title}
      height="250px"
      width="100%"
      objectFit="cover"
      borderTopRadius="lg"
    />
  } else {
    imageCheck = <Image
      className='bad-image'
      alt={shoe.title}
      height="250px"
      width="100%"
      objectFit="cover"
      borderTopRadius="lg"
    />
  }

  const handleClick = async (e) => {
    e.preventDefault()
    // Search for the shoe in sneaks.js API
    const styleId = await dispatch(searchByExactName(shoe.title))
    if (styleId) {
      navigate(`/sneaker/${styleId}`)
    } else {
      // Fallback to the original shoe details page if no match found
      navigate(`/shoes/${shoe.id}`)
    }
  }

  return (
    <Box
      w="100%"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      {imageCheck}
      <VStack align="stretch" p={4} spacing={2}>
        <Text fontWeight="bold" fontSize="lg" noOfLines={2}>
          {shoe.title}
        </Text>
        <Badge colorScheme="blue" alignSelf="flex-start">
          {shoe.brand}
        </Badge>
        <Text fontSize="xl" color="blue.500" fontWeight="semibold">
          {currency(shoe.price).format()}
        </Text>
      </VStack>
    </Box>
  )
}

export default ShoeList
