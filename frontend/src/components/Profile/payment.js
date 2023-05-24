import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Link, Flex, Text, SimpleGrid} from "@chakra-ui/react";



function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'    >
        <Box w='20%' pl='8px'>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} >Profile</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/payment' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Order History</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Selling</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/watch' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex> */}
        </Box>
        <Box w='100%'>

          <Box>
            <Flex justify={'space-between'} w='75%' py='8px' pos='relative' left='5%' borderBottom={'2px'}>
              <Text fontSize={'30px'}>Auto save payment</Text>
            </Flex>

            <SimpleGrid columns={3} spacing={10} px='5%' pt='2%'>
              <Box height='80px'>
                <Text >Full Name :</Text>
              </Box>
              <Box height='80px'>
                <Text >Card Number</Text>
              </Box>
              <Box height='80px'>
                <Text >Expiration Date</Text>
              </Box>
              <Box height='80px'>
                <Text>Shipping Address</Text>
                <Text></Text>
              </Box>
              <Box height='80px'>
                <Text>City</Text>
              </Box>
              <Box height='80px'>
                <Text>State/Province</Text>
              </Box>
              <Box height='80px'>
                <Text>Phone Number :</Text>
                <Text>333-444-5555</Text>
              </Box>
              <Box height='80px'><Button bg='red.400'>Reset Password</Button></Box>
            </SimpleGrid>

          </Box>
        </Box>
      </Flex>
    </Box>
  )
}


export default PaymentPage;
