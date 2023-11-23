import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeShoeFromCart } from '../../store/shoppingCart'
import currency from 'currency.js'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  Image
} from '@chakra-ui/react'

function CartItem ({ item }) {
  const dispatch = useDispatch()

  // Built out cart and destructure the item thats being passed in as a prop
  const cart = useSelector((state) => state.shoppingCart)

  // Needs to be in a function to be able to useDispatch inside the store
  const removeShoe = async () => {
    await dispatch(removeShoeFromCart(item.shoeId, cart))
  }

  return (
    <Box>
      <Flex w='90%' justify='space-between' alignItems='center'>
        <Image src={item.img} borderRadius='full' boxSize='150px' />
        <Box w='30%'>{item.title} </Box>
        <Box>{currency(item.price).format()}</Box>
        <Box>Size: {item.size}</Box>
        <Button onClick={removeShoe} bg='none' fontSize='20px' fontWeight='bold' _hover={{ bg: 'none' }}>
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  )
}

export default CartItem
