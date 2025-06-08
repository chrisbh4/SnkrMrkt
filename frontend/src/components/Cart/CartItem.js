import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeShoeFromCart } from '../../store/shoppingCart'
import currency from 'currency.js'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  Image,
  Text
} from '@chakra-ui/react'

function CartItem({ item }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.shoppingCart)

  const removeShoe = async () => {
    await dispatch(removeShoeFromCart(item.cartItemId, cart))
  }

  const handleShoeClick = () => {
    navigate(`/sneaker/${item.shoeId}`)
  }

  return (
    <Box>
      <Flex w='90%' justify='space-between' alignItems='center'>
        <Image
          src={item.img}
          borderRadius='full'
          boxSize='150px'
          cursor='pointer'
          onClick={handleShoeClick}
        />
        <Box
          w='30%'
          cursor='pointer'
          onClick={handleShoeClick}
        >
          <Text>{item.title}</Text>
        </Box>
        <Box>{currency(item.price).format()}</Box>
        <Box>Size: {item.size}</Box>
        <Button
          onClick={removeShoe}
          bg='none'
          fontSize='20px'
          fontWeight='bold'
          _hover={{ bg: 'none' }}
        >
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  )
}

export default CartItem
