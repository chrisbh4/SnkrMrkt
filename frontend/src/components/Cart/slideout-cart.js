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
  Text,
  VStack,
  HStack,
  Flex,
  Box,
  Badge,
  Divider,
  Icon,
  useColorModeValue,
  Heading
} from '@chakra-ui/react'
import { FiShoppingCart, FiShoppingBag, FiCreditCard } from 'react-icons/fi'

function SlideOutCart () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const shoppingCart = useSelector((state) => state.shoppingCart)
  const cart = Object.values(shoppingCart)

  // Color mode values - moved to top level
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400')
  const summaryBgColor = useColorModeValue('gray.50', 'gray.700')

  let total = 0.00
  cart.forEach((item) => {
    total += parseFloat(item.price)
  })

  const totalPriceOfShoes = total.toFixed(2)
  const feePrices = total * 0.015 // 1.5% fee
  const stateTax = total > 0 ? 8.25 : 0 // More realistic tax amount
  const pricePostTaxes = total + stateTax + feePrices

  const cartItemCount = cart.length

  return (
    <>
      {/* Enhanced Cart Trigger Button */}
      <Button
        ref={btnRef}
        onClick={onOpen}
        bg="transparent"
        color="white"
        _hover={{
          bg: 'whiteAlpha.200',
          transform: 'scale(1.05)'
        }}
        _active={{
          bg: 'whiteAlpha.300'
        }}
        position="relative"
        p={3}
        borderRadius="lg"
        transition="all 0.2s"
      >
        <Icon as={FiShoppingCart} boxSize={5} />
        {cartItemCount > 0 && (
          <Badge
            position="absolute"
            top="-1"
            right="-1"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
            minW="20px"
            h="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
          >
            {cartItemCount}
          </Badge>
        )}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay bg="blackAlpha.600" />
        <DrawerContent bg={bgColor} maxW="400px">
          <DrawerCloseButton
            size="lg"
            top={4}
            right={4}
            _hover={{ bg: 'gray.100' }}
          />
          
          {/* Enhanced Header */}
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor} pb={4}>
            <VStack align="flex-start" spacing={2}>
              <HStack>
                <Icon as={FiShoppingBag} boxSize={6} color="blue.500" />
                <Heading size="lg" color={textColor}>Your Cart</Heading>
              </HStack>
              <Text fontSize="sm" color={subtleTextColor}>
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </Text>
            </VStack>
          </DrawerHeader>

          <DrawerBody px={0}>
            {cart.length === 0 ? (
              /* Empty Cart State */
              <VStack spacing={6} py={12} px={6} textAlign="center">
                <Box
                  w="80px"
                  h="80px"
                  bg="gray.100"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiShoppingCart} boxSize={8} color="gray.400" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="md" color={textColor}>Your cart is empty</Heading>
                  <Text color={subtleTextColor} fontSize="sm">
                    Start shopping to add items to your cart
                  </Text>
                </VStack>
                <Button
                  colorScheme="blue"
                  onClick={onClose}
                  size="lg"
                  borderRadius="full"
                  px={8}
                >
                  Continue Shopping
                </Button>
              </VStack>
            ) : (
              /* Cart Items */
              <VStack spacing={0} align="stretch">
                <Box maxH="400px" overflowY="auto" px={4}>
                  {cart.map((item, index) => (
                    <Box key={item.shoeId}>
                      <SlideOutCartItem item={item} />
                      {index < cart.length - 1 && (
                        <Divider my={4} borderColor={borderColor} />
                      )}
                    </Box>
                  ))}
                </Box>

                {/* Price Summary */}
                <Box px={6} py={6} bg={summaryBgColor} mt={4}>
                  <VStack spacing={3} align="stretch">
                    <Heading size="sm" color={textColor} mb={2}>Order Summary</Heading>
                    
                    <Flex justify="space-between" align="center">
                      <Text color={subtleTextColor}>Subtotal</Text>
                      <Text fontWeight="semibold" color={textColor}>
                        {currency(totalPriceOfShoes).format()}
                      </Text>
                    </Flex>
                    
                    <Flex justify="space-between" align="center">
                      <Text color={subtleTextColor}>Processing Fee (1.5%)</Text>
                      <Text color={textColor}>
                        {currency(feePrices).format()}
                      </Text>
                    </Flex>
                    
                    <Flex justify="space-between" align="center">
                      <Text color={subtleTextColor}>Shipping</Text>
                      <Text color="green.500" fontWeight="semibold">FREE</Text>
                    </Flex>
                    
                    <Flex justify="space-between" align="center">
                      <Text color={subtleTextColor}>Tax</Text>
                      <Text color={textColor}>
                        {currency(stateTax).format()}
                      </Text>
                    </Flex>
                    
                    <Divider borderColor={borderColor} />
                    
                    <Flex justify="space-between" align="center">
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        Total
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="blue.500">
                        {currency(pricePostTaxes).format()}
                      </Text>
                    </Flex>
                  </VStack>
                </Box>
              </VStack>
            )}
          </DrawerBody>

          {/* Enhanced Footer */}
          {cart.length > 0 && (
            <DrawerFooter borderTopWidth="1px" borderColor={borderColor} p={6}>
              <VStack w="full" spacing={3}>
                <Link 
                  href="/cart" 
                  w="full"
                  _hover={{ textDecor: 'none' }}
                  onClick={onClose}
                >
                  <Button
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    leftIcon={<Icon as={FiCreditCard} />}
                    borderRadius="lg"
                    boxShadow="lg"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'xl'
                    }}
                    transition="all 0.2s"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Button
                  variant="ghost"
                  size="md"
                  onClick={onClose}
                  color={subtleTextColor}
                  _hover={{ bg: 'gray.100' }}
                >
                  Continue Shopping
                </Button>
              </VStack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SlideOutCart
