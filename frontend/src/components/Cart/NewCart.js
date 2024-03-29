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
  Stack
} from '@chakra-ui/react'

function CheckoutForm () {
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      alert('Your order is being processed you will recieve an order confirmation email soon')
      navigate('/home')
      return data
    } else {
      setErrors(data?.errors)
      return data
    }
  }

  return (
    <>
      <Box>
        <Flex bg='gray.100'>
          <Box w='full'>
            <FormControl pt='2%'>
              <Box py='20px' />
              <Box pb={8} px='25%'>
                <Box>
                  <Text fontSize='2xl'>Contact information</Text>
                  <Flex justify='start'>
                    <Box w='full'>
                      <FormLabel>Email Address</FormLabel>
                      {errors.includes('Email must be valid') && <Text color='red.400'>Input a valid email</Text>}
                      <Input borderColor='black' bg='gray.50' onChange={updateEmail} />
                    </Box>
                  </Flex>
                </Box>

                <Box w='full' border='1px' borderColor='gray.300' mt='8%' />
                <Box mt='4%'>
                  <Text fontSize='2xl'>Payment Details </Text>
                  <Box w='full' mt='2%'>
                    <FormLabel>Name on card</FormLabel>
                    {errors.includes('Must input the full name on the card') && <Text color='red.400'>Input the full name of card owner</Text>}
                    <Input borderColor='black' bg='gray.50' onChange={updateNameOnCard} />
                  </Box>
                  <Box w='full' mt='5%'>
                    <FormLabel>Card Number</FormLabel>
                    {errors.includes('Must be a valid card number') && <Text color='red.400'>Must be a valid card number</Text>}
                    {errors.includes('Card number must be between 13 and 19 digits') && <Text color='red.400'>Card number must be between 13 and 19 digits</Text>}
                    <Input borderColor='black' bg='gray.50' onChange={updateCardNumber} placeholder='xxxx xxxx xxxx xxxx' />
                  </Box>
                  <Flex w='full' mt='5%'>
                    <Box>
                      <FormLabel>Expiration Date</FormLabel>
                      {errors.includes('Must input an expiration date') && <Text color='red.400'>*required</Text>}
                      {errors.includes('Must be a valid MM/YY date') && <Text color='red.400'>Must be a valid MM/YY date</Text>}
                      {errors.includes('Expiration date must be in the future') && <Text color='red.400'>Expiration date must be in the future</Text>}
                      <Input borderColor='black' bg='gray.50' w='120%' onChange={updateExpirationDate} placeholder='MM/YY' />
                    </Box>

                  </Flex>

                  <Flex w='full' mt='5%'>
                    <Box w='full'>
                      <FormLabel>CVV</FormLabel>
                      {errors.includes('Must be a valid CVV number') && <Text color='red.400'>Must be a valid CVV number.</Text>}
                      {errors.includes('CVV must be a 3 digit number') && <Text color='red.400'>CVV must be a 3 digit number.</Text>}
                      <Input w='20%' borderColor='black' bg='gray.50' onChange={updateCvvNumber} placeholder='xxx' />
                    </Box>
                  </Flex>

                </Box>

                <Box w='full' border='1px' borderColor='gray.300' mt='8%' />
                <Box mt='8%'>
                  <Text fontSize='2xl'>Shipping Information</Text>
                  <Flex w='full' justify='space-between'>
                    <Box w='47%' mt='2%'>
                      <FormLabel>First Name</FormLabel>
                      {errors.includes('Must input a first name') && <Text color='red.400'>Input a first name</Text>}
                      <Input borderColor='black' bg='gray.50' onChange={updateFirstName} />
                    </Box>
                    <Box w='47%' mt='2%'>
                      <FormLabel>Last Name</FormLabel>
                      {errors.includes('Must input a last name') && <Text color='red.400'>Input a last name</Text>}
                      <Input borderColor='black' bg='gray.50' onChange={updateLastName} />
                    </Box>
                  </Flex>

                  <Box w='full' mt='2%'>
                    <FormLabel>Company (optional)</FormLabel>
                    <Input borderColor='black' bg='gray.50' onChange={updateCompany} />
                  </Box>
                  <Box w='full' mt='5%'>
                    <FormLabel>Address</FormLabel>
                    {errors.includes('Must input a billing address') && <Text color='red.400'>Input a billing address</Text>}
                    <Input borderColor='black' bg='gray.50' onChange={updateAddress} />
                  </Box>
                  <Box w='full' mt='5%'>
                    <FormLabel>Apartment, suite, etc.</FormLabel>
                    <Input borderColor='black' bg='gray.50' onChange={updateOtherAddress} />
                  </Box>
                  <Flex w='full' mt='5%' justify='space-between'>
                    <Box w='47%'>
                      <FormLabel>City</FormLabel>
                      {errors.includes('Must input a city name') && <Text color='red.400'>Input a city name</Text>}
                      <Input borderColor='black' bg='gray.50' onChange={updateCity} />
                    </Box>

                    <Box w='47%'>
                      <FormLabel>Country</FormLabel>
                      {errors.includes('Must select a one of the available countries') && <Text color='red.400'>*required</Text>}
                      <Select borderColor='black' bg='gray.50' onChange={updateCountry}>
                        <option value='' />
                        <option value='United States'>United States</option>
                        {/* <option value='Canada'>Canada</option> */}
                        {/* <option value='Mexico'>Mexico</option> */}
                      </Select>
                    </Box>

                  </Flex>
                  <Flex w='full' mt='5%' justify='space-between'>
                    <Box w='47%'>
                      <FormLabel>State/Province</FormLabel>
                      {errors.includes('Must input a State or Province') && <Text color='red.400'>*required</Text>}
                      <Select borderColor='black' bg='gray.50' onChange={updateStateProvince}>
                        <option value='' />
                        {usStateInitials.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </Select>

                    </Box>

                  </Flex>

                  <Flex w='full' mt='5%' justify='space-between'>
                    <Box w='full%'>
                      <FormLabel>Postal Code</FormLabel>
                      {errors.includes('Must be a valid postal code') && <Text color='red.400'> Must be a valid postal code</Text>}
                      {errors.includes('Postal code must be a 5 digit number') && <Text color='red.400'> Postal code must be a 5 digit number</Text>}
                      <Input w='47%' borderColor='black' bg='gray.50' onChange={updatePostalCode} />
                    </Box>
                  </Flex>

                  <Box mt='5%'>
                    <FormLabel>Phone Number</FormLabel>
                    {errors.includes('Invalid phone number') && <Text color='red.400'>Invalid phone number</Text>}
                    <Input borderColor='black' bg='gray.50' onChange={updatePhoneNumber} />
                  </Box>

                </Box>

                <Box w='full' border='1px' borderColor='gray.300' mt='8%' />

                <Button w='30%' mt='5%' onClick={onSubmit} colorScheme='green'>Submit</Button>
              </Box>
            </FormControl>
          </Box>
          <Stack w='full' p='3%'>
            <Box bg='gray.100' w='full' minH='500px' maxH='500px' overflow='scroll'>
              {cart.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </Box>

            <Box w='full' border='1px' borderColor='gray.300' mt='8%' />
            <Box>
              <Flex justify='space-between'>
                <Text>Market Price</Text>
                <Text>{totalPriceOfShoes > 0 ? `${currency(totalPriceOfShoes).format()}` : '$0.00'}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>Fees</Text>
                <Text>{totalPriceOfShoes > 0 ? `${currency(feePrices).format()}` : null}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>Delivery Method</Text>
                <Text>Free Shipping</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>Tax</Text>
                <Text>{totalPriceOfShoes > 0 ? `${currency(stateTax).format()}` : null}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>Total</Text>
                <Text>{totalPriceOfShoes > 0 ? `${currency(pricePostTaxes).format()}` : '0.00'}</Text>
              </Flex>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </>
  )
}

export default CheckoutForm
