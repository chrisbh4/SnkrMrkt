import React from 'react'
import { useSelector } from 'react-redux'
import SlideOutCartItem from './slideout-item'
import currency from 'currency.js'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Link,
  Center,
  Text,
  VStack
} from '@chakra-ui/react'

function SlideOutCart () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const shoppingCart = useSelector((state) => state.shoppingCart)
  const cart = Object.values(shoppingCart)

  let total = 0.00
  cart.forEach((item) => {
    total += parseFloat(item.price)
  })

  const totalPriceOfShoes = total.toFixed(2)
  const feePrices = total * 0.01
  const stateTax = 2
  const pricePostTaxes = total + stateTax + feePrices

  const emptyCart = <h1 className='empty-cart'>Cart is empty </h1>

  return (
    <>
      <Button ref={btnRef} colorScheme='black' onClick={onOpen}>
        <i className='fas fa-shopping-cart' style={{ fontSize: '13px' }} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xl'

      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            <div className='cart-container'>
              {cart.map((item) => (
                <SlideOutCartItem item={item} key={item.shoeId} />
              ))}
              <Center>
                <VStack align='flex-start' ml='8%'>
                  <Text className='total-price'>{totalPriceOfShoes > 0 ? `Market Price : ${currency(totalPriceOfShoes).format()}` : emptyCart}</Text>
                  <Text className='total-price'>{totalPriceOfShoes > 0 ? `Site fee 1.5%  : ${currency(feePrices).format()}` : null}</Text>
                  <Text className='total-price'>{totalPriceOfShoes > 0 ? `Tax: ${currency(stateTax).format()}` : null}</Text>
                  <Text className='total-price'>{totalPriceOfShoes > 0 ? `Total: ${currency(pricePostTaxes).format()}` : null}</Text>
                </VStack>
              </Center>
              <Center>
                {totalPriceOfShoes > 0 ? <Link href='/cart' mt='4%' _hover={{ textDecor: 'none' }}> <Button bg='red.300'> Checkout </Button></Link> : null}
              </Center>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} bg='red.300' onClick={onClose}>
              Close
            </Button>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SlideOutCart
