import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeShoeFromCart } from '../../store/shoppingCart'
import { DeleteIcon } from '@chakra-ui/icons'
import currency from 'currency.js'
import {
  Button,
  Image,
  GridItem,
  SimpleGrid,
  Text
} from '@chakra-ui/react'

function SlideOutCartItem({ item }) {
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
    <SimpleGrid columns={5} alignContent='center' alignItems='center' rows={1} gap={6}>
      <GridItem w='100%' h='auto'>
        <Image
          src={item.img}
          borderRadius='full'
          boxSize='150px'
          cursor='pointer'
          onClick={handleShoeClick}
        />
      </GridItem>

      <GridItem
        w='100%'
        pos='relative'
        left='10%'
        textAlign='center'
        cursor='pointer'
        onClick={handleShoeClick}
      >
        <Text>{item.title}</Text>
      </GridItem>
      <GridItem w='100%' textAlign='center'>
        <Text>{currency(item.price).format()}</Text>
      </GridItem>
      <GridItem w='100%' textAlign='center'>
        <Text>Size: {item.size}</Text>
      </GridItem>
      <GridItem w='100%'>
        <Button
          onClick={removeShoe}
          bg='none'
          size='sm'
          fontSize='20px'
          fontWeight='bold'
          _hover={{ bg: 'none' }}
        >
          <DeleteIcon />
        </Button>
      </GridItem>
    </SimpleGrid>
  )
}

export default SlideOutCartItem
