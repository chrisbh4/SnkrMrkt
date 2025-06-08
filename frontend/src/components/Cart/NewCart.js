import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { fetchCreateNewOrder } from '../../store/orders'
import { purchaseFromCart } from '../../store/shoppingCart'
import currency from 'currency.js'
import './Cart.css'
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Text,
  Flex,
  Button,
  Select,
  Stack,
  Container,
  Grid,
  GridItem,
  Heading,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  Badge,
  useToast
} from '@chakra-ui/react'
import {
  FiMail,
  FiCreditCard,
  FiTruck,
  FiUser,
  FiMapPin,
  FiPhone,
  FiLock,
  FiCalendar
} from 'react-icons/fi'

function CheckoutForm () {
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const shoppingCartState = useSelector((state) => state.shoppingCart)
  const cart = Object.values(shoppingCartState)
  const user = useSelector((state) => state.session.user)
  const buyerId = user?.id
  const username = user?.username

  const [email, setEmail] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvvNumber, setCvvNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [otherAddress, setOtherAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [stateProvince, setStateProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const usStateInitials = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  const updateEmail = (e) => setEmail(e.target.value)
  const updateNameOnCard = (e) => setNameOnCard(e.target.value)
  const updateCardNumber = (e) => setCardNumber(e.target.value)
  const updateExpirationDate = (e) => setExpirationDate(e.target.value)
  const updateCvvNumber = (e) => setCvvNumber(e.target.value)
  const updateFirstName = (e) => setFirstName(e.target.value)
  const updateLastName = (e) => setLastName(e.target.value)
  const updateCompany = (e) => setCompany(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateOtherAddress = (e) => setOtherAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateStateProvince = (e) => setStateProvince(e.target.value)
  const updatePostalCode = (e) => setPostalCode(e.target.value)
  const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)

  let total = 0.00
  cart.forEach((item) => {
    total += parseFloat(item.price)
  })
  const totalPriceOfShoes = total.toFixed(2)
  const feePrices = total * 0.01
  const stateTax = 2
  const pricePostTaxes = total + stateTax + feePrices
  const totalAmount = pricePostTaxes

  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const onSubmit = async (e) => {
    e.preventDefault()
    const shoeIds = cart.map(item => item.shoeId)
    const payload = {
      username,
      buyerId,
      email,
      nameOnCard,
      cardNumber,
      expirationDate,
      cvvNumber,
      firstName,
      lastName,
      company,
      address,
      otherAddress,
      city,
      country,
      stateProvince,
      postalCode,
      phoneNumber,
      shoeIds,
      totalAmount
    }
    const data = await dispatch(fetchCreateNewOrder(payload))
    if (!data?.errors) {
      dispatch(purchaseFromCart())
      toast({
        title: 'Order Confirmed!',
        description: 'Your order is being processed. You will receive a confirmation email soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/home')
      return data
    } else {
      setErrors(data?.errors)
      return data
    }
  }

  return (
    <Box bg={bg} minH="100vh" py={8}>
      <Container maxW="container.2xl">
      {/* <Container maxW=""> */}
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading size="xl" mb={2}>Secure Checkout</Heading>
            <Text color="gray.600">Complete your purchase securely</Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1.75fr' }} gap={6} px={'2em'}>
            {/* Main Form */}
            <GridItem px={'8em'}>
              <VStack spacing={6} align="stretch">
                {/* Contact Information */}
                <Box 
                  bg={cardBg} 
                  shadow="sm" 
                  borderColor={borderColor}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                >
                  <Box pb={4}>
                    <HStack>
                      <Icon as={FiMail} color="blue.500" />
                      <Heading size="md">Contact Information</Heading>
                    </HStack>
                  </Box>
                  <Box pt={0}>
                    <FormControl>
                      <FormLabel fontWeight="semibold">Email Address</FormLabel>
                      {errors.includes('Email must be valid') && (
                        <Alert status="error" mb={3} size="sm">
                          <AlertIcon />
                          Please enter a valid email address
                        </Alert>
                      )}
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiMail} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="email"
                          value={email}
                          onChange={updateEmail}
                          placeholder="your@email.com"
                          borderColor={borderColor}
                          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                        />
                      </InputGroup>
                    </FormControl>
                  </Box>
                </Box>

                {/* Payment Details */}
                <Box 
                  bg={cardBg} 
                  shadow="sm" 
                  borderColor={borderColor}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                >
                  <Box pb={4}>
                    <HStack>
                      <Icon as={FiCreditCard} color="green.500" />
                      <Heading size="md">Payment Details</Heading>
                      <Badge colorScheme="green" variant="subtle">
                        <Icon as={FiLock} mr={1} />
                        Secure
                      </Badge>
                    </HStack>
                  </Box>
                  <Box pt={0}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel fontWeight="semibold">Name on Card</FormLabel>
                        {errors.includes('Must input the full name on the card') && (
                          <Alert status="error" mb={3} size="sm">
                            <AlertIcon />
                            Please enter the full name as it appears on your card
                          </Alert>
                        )}
                        <InputGroup>
                          <InputLeftElement>
                            <Icon as={FiUser} color="gray.400" />
                          </InputLeftElement>
                          <Input
                            value={nameOnCard}
                            onChange={updateNameOnCard}
                            placeholder="John Doe"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="semibold">Card Number</FormLabel>
                        {(errors.includes('Must be a valid card number') || errors.includes('Card number must be between 13 and 19 digits')) && (
                          <Alert status="error" mb={3} size="sm">
                            <AlertIcon />
                            Please enter a valid card number
                          </Alert>
                        )}
                        <InputGroup>
                          <InputLeftElement>
                            <Icon as={FiCreditCard} color="gray.400" />
                          </InputLeftElement>
                          <Input
                            value={cardNumber}
                            onChange={updateCardNumber}
                            placeholder="1234 5678 9012 3456"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </InputGroup>
                      </FormControl>

                      <HStack width="100%">
                        <FormControl>
                          <FormLabel fontWeight="semibold">Expiration Date</FormLabel>
                          {(errors.includes('Must input an expiration date') || errors.includes('Must be a valid MM/YY date') || errors.includes('Expiration date must be in the future')) && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              Please enter a valid future date (MM/YY)
                            </Alert>
                          )}
                          <InputGroup>
                            <InputLeftElement>
                              <Icon as={FiCalendar} color="gray.400" />
                            </InputLeftElement>
                            <Input
                              value={expirationDate}
                              onChange={updateExpirationDate}
                              placeholder="MM/YY"
                              borderColor={borderColor}
                              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl maxW="150px">
                          <FormLabel fontWeight="semibold">CVV</FormLabel>
                          {(errors.includes('Must be a valid CVV number') || errors.includes('CVV must be a 3 digit number')) && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              Please enter a valid 3-digit CVV
                            </Alert>
                          )}
                          <InputGroup>
                            <InputLeftElement>
                              <Icon as={FiLock} color="gray.400" />
                            </InputLeftElement>
                            <Input
                              value={cvvNumber}
                              onChange={updateCvvNumber}
                              placeholder="123"
                              maxLength={3}
                              borderColor={borderColor}
                              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            />
                          </InputGroup>
                        </FormControl>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>

                {/* Shipping Information */}
                <Box 
                  bg={cardBg} 
                  shadow="sm" 
                  borderColor={borderColor}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                >
                  <Box pb={4}>
                    <HStack>
                      <Icon as={FiTruck} color="purple.500" />
                      <Heading size="md">Shipping Information</Heading>
                    </HStack>
                  </Box>
                  <Box pt={0}>
                    <VStack spacing={4}>
                      <HStack width="100%">
                        <FormControl>
                          <FormLabel fontWeight="semibold">First Name</FormLabel>
                          {errors.includes('Must input a first name') && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              First name is required
                            </Alert>
                          )}
                          <Input
                            value={firstName}
                            onChange={updateFirstName}
                            placeholder="John"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel fontWeight="semibold">Last Name</FormLabel>
                          {errors.includes('Must input a last name') && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              Last name is required
                            </Alert>
                          )}
                          <Input
                            value={lastName}
                            onChange={updateLastName}
                            placeholder="Doe"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </FormControl>
                      </HStack>

                      <FormControl>
                        <FormLabel fontWeight="semibold">Company <Text as="span" color="gray.500">(optional)</Text></FormLabel>
                        <Input
                          value={company}
                          onChange={updateCompany}
                          placeholder="Company Name"
                          borderColor={borderColor}
                          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="semibold">Street Address</FormLabel>
                        {errors.includes('Must input a billing address') && (
                          <Alert status="error" mb={3} size="sm">
                            <AlertIcon />
                            Street address is required
                          </Alert>
                        )}
                        <InputGroup>
                          <InputLeftElement>
                            <Icon as={FiMapPin} color="gray.400" />
                          </InputLeftElement>
                          <Input
                            value={address}
                            onChange={updateAddress}
                            placeholder="123 Main Street"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="semibold">Apartment, Suite, etc. <Text as="span" color="gray.500">(optional)</Text></FormLabel>
                        <Input
                          value={otherAddress}
                          onChange={updateOtherAddress}
                          placeholder="Apt 4B"
                          borderColor={borderColor}
                          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                        />
                      </FormControl>

                      <HStack width="100%">
                        <FormControl>
                          <FormLabel fontWeight="semibold">City</FormLabel>
                          {errors.includes('Must input a city name') && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              City is required
                            </Alert>
                          )}
                          <Input
                            value={city}
                            onChange={updateCity}
                            placeholder="New York"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel fontWeight="semibold">State</FormLabel>
                          {errors.includes('Must input a State or Province') && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              State is required
                            </Alert>
                          )}
                          <Select
                            value={stateProvince}
                            onChange={updateStateProvince}
                            placeholder="Select state"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          >
                            {usStateInitials.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl maxW="120px">
                          <FormLabel fontWeight="semibold">ZIP Code</FormLabel>
                          {(errors.includes('Must be a valid postal code') || errors.includes('Postal code must be a 5 digit number')) && (
                            <Alert status="error" mb={3} size="sm">
                              <AlertIcon />
                              Valid ZIP code required
                            </Alert>
                          )}
                          <Input
                            value={postalCode}
                            onChange={updatePostalCode}
                            placeholder="12345"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </FormControl>
                      </HStack>

                      <FormControl>
                        <FormLabel fontWeight="semibold">Country</FormLabel>
                        {errors.includes('Must select a one of the available countries') && (
                          <Alert status="error" mb={3} size="sm">
                            <AlertIcon />
                            Country selection is required
                          </Alert>
                        )}
                        <Select
                          value={country}
                          onChange={updateCountry}
                          placeholder="Select country"
                          borderColor={borderColor}
                          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                        >
                          <option value='United States'>United States</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="semibold">Phone Number</FormLabel>
                        {errors.includes('Invalid phone number') && (
                          <Alert status="error" mb={3} size="sm">
                            <AlertIcon />
                            Please enter a valid phone number
                          </Alert>
                        )}
                        <InputGroup>
                          <InputLeftElement>
                            <Icon as={FiPhone} color="gray.400" />
                          </InputLeftElement>
                          <Input
                            value={phoneNumber}
                            onChange={updatePhoneNumber}
                            placeholder="(555) 123-4567"
                            borderColor={borderColor}
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                          />
                        </InputGroup>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>

                {/* Submit Button */}
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={onSubmit}
                  isDisabled={cart.length === 0}
                  _hover={{ transform: 'translateY(-1px)', shadow: 'lg' }}
                  leftIcon={<Icon as={FiLock} />}
                >
                  Complete Secure Checkout
                </Button>
              </VStack>
            </GridItem>

            {/* Order Summary */}
            <GridItem
              pos={'relative'}
              right={'5em'}
            >
              <Box 
                bg={cardBg} 
                shadow="md" 
                borderColor={borderColor} 
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                position="sticky" 
                top="20px"
              >
                <Box pb={4}>
                  <Heading size="md">Order Summary</Heading>
                </Box>
                <Box>
                  <VStack spacing={4} align="stretch">
                    {/* Cart Items */}
                    <Box maxH="400px" overflowY="auto">
                      {cart.length > 0 ? (
                        cart.map((item) => (
                          <CartItem item={item} key={item.id} />
                        ))
                      ) : (
                        <Text color="gray.500" textAlign="center" py={4}>
                          Your cart is empty
                        </Text>
                      )}
                    </Box>

                    <Divider />

                    {/* Price Breakdown */}
                    <VStack spacing={3} align="stretch">
                      <Flex justify="space-between">
                        <Text>Subtotal</Text>
                        <Text fontWeight="semibold">
                          {totalPriceOfShoes > 0 ? currency(totalPriceOfShoes).format() : '$0.00'}
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Processing Fee</Text>
                        <Text>
                          {totalPriceOfShoes > 0 ? currency(feePrices).format() : '$0.00'}
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Shipping</Text>
                        <Text color="green.500" fontWeight="semibold">Free</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text>Tax</Text>
                        <Text>
                          {totalPriceOfShoes > 0 ? currency(stateTax).format() : '$0.00'}
                        </Text>
                      </Flex>
                      <Divider />
                      <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                        <Text>Total</Text>
                        <Text color="blue.500">
                          {totalPriceOfShoes > 0 ? currency(pricePostTaxes).format() : '$0.00'}
                        </Text>
                      </Flex>
                    </VStack>
                  </VStack>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}

export default CheckoutForm
