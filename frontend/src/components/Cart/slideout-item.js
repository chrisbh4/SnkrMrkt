import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeShoeFromCart } from '../../store/shoppingCart'
import currency from 'currency.js'
import {
  Image,
  Text,
  Box,
  Flex,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Badge
} from '@chakra-ui/react'
import { FiTrash2, FiEye } from 'react-icons/fi'

function SlideOutCartItem({ item }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.shoppingCart)

  // Color mode values
  const textColor = useColorModeValue('gray.800', 'white')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  const removeShoe = async () => {
    await dispatch(removeShoeFromCart(item.cartItemId, cart))
  }

  const handleShoeClick = () => {
    navigate(`/sneaker/${item.shoeId}`)
  }

  return (
    <Box
      py={4}
      px={2}
      _hover={{ bg: hoverBg }}
      borderRadius="lg"
      transition="all 0.2s"
    >
      <Flex gap={4} align="flex-start">
        {/* Product Image */}
        <Box position="relative" flexShrink={0}>
          <Image
            src={item.img}
            alt={item.title}
            borderRadius="lg"
            boxSize="80px"
            objectFit="cover"
            cursor="pointer"
            onClick={handleShoeClick}
            fallbackSrc="https://via.placeholder.com/80x80/f7fafc/718096?text=Shoe"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          />
          <IconButton
            icon={<FiEye />}
            size="xs"
            position="absolute"
            top={1}
            right={1}
            colorScheme="gray"
            variant="solid"
            borderRadius="full"
            onClick={handleShoeClick}
            opacity={0.8}
            _hover={{ opacity: 1 }}
          />
        </Box>

        {/* Product Details */}
        <VStack align="flex-start" spacing={1} flex={1} minW={0}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color={textColor}
            noOfLines={2}
            cursor="pointer"
            onClick={handleShoeClick}
            _hover={{ color: 'blue.500' }}
            transition="color 0.2s"
            lineHeight="1.3"
          >
            {item.title}
          </Text>
          
          <HStack spacing={2} wrap="wrap">
            <Badge colorScheme="gray" size="sm" variant="subtle">
              Size {item.size}
            </Badge>
          </HStack>
          
          <HStack justify="space-between" w="full" align="center" mt={2}>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              {currency(item.price).format()}
            </Text>
            
            <IconButton
              icon={<FiTrash2 />}
              size="sm"
              colorScheme="red"
              variant="ghost"
              onClick={removeShoe}
              aria-label="Remove item"
              borderRadius="full"
              _hover={{
                bg: 'red.50',
                color: 'red.600',
                transform: 'scale(1.1)'
              }}
              transition="all 0.2s"
            />
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

export default SlideOutCartItem
