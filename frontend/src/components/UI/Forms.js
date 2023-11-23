import React from 'react'
import './NewShoeForm.css'

import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Heading,
  Grid,
  Flex
} from '@chakra-ui/react'

function NewShoesForm () {
  return (
    <>
      <FormControl pt='2%'>
        <Box pb={12} px='25%'>
          <Heading size='md' fontWeight='semibold' color='gray.900'>Personal Information</Heading>
          <Grid
            templateRows='repeat(5, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap={4}
            p='4%'
            borderBottom='1px'
            borderColor='gray.500'
          >
            <Flex h='20' justify='start'>
              <Box w='40%'>
                <FormLabel>First Name</FormLabel>
                <Input bg='gray.50' placeholder='First Name' />
              </Box>
              <Box w='40%'>
                <FormLabel ml='6%'>Last Name</FormLabel>
                <Input bg='gray.50' placeholder='Last Name' ml='6%' />
              </Box>
            </Flex>
            <Box h='20' w='50%'>
              <FormLabel>Email</FormLabel>
              <Input bg='gray.50' placeholder='Email' />
            </Box>
            <Box h='20' w='35%'>
              <FormLabel>Country</FormLabel>
              <Input bg='gray.50' placeholder='Country' />
            </Box>
            <Box h='20' w='50%'>
              <FormLabel>Street Address</FormLabel>
              <Input bg='gray.50' placeholder='Street Address' />
            </Box>
            <Flex h='20' justify='start'>
              <Box w='30%'>
                <FormLabel>City</FormLabel>
                <Input bg='gray.50' placeholder='City' />
              </Box>
              <Box w='30%' ml='2.5%'>
                <FormLabel>State</FormLabel>
                <Input bg='gray.50' placeholder='State' />
              </Box>
              <Box w='30%' ml='2.5%'>
                <FormLabel>Zip</FormLabel>
                <Input bg='gray.50' placeholder='Zip' />
              </Box>
            </Flex>
          </Grid>
        </Box>

      </FormControl>

    </>
  )
}

export default NewShoesForm
