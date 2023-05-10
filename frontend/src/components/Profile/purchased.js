import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Center, Image, VStack, Link, Flex, Text, SimpleGrid, GridItem, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import * as sessionActions from '../../store/session';
import { purchaseFromCart } from "../../store/shoppingCart";



function PurchasedPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  console.log(user)



  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'    >
        <Box w='20%' pl='8px'>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} >Profile</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/payment' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Orders</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Selling</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/watch' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href={`/${user.id}/selling`} _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} >Profile</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href={`/${user.id}/payments`} _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Preference</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href={`/${user.id}/purchased`} _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Orders</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href={`/${user.id}/selling`} _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Selling</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href={`/${user.id}/watching`} _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex> */}
        </Box>
        <Box w='100%' bg=''>

          <Box>
            <Flex justify={'space-between'} w='75%' py='8px' pos='relative' left='5%' borderBottom={'2px'}>
              <Text fontSize={'30px'}>Orders</Text>
            </Flex>



            <SimpleGrid columns={3} spacing={10} px='5%' pt='2%'>
            </SimpleGrid>

          </Box>
        </Box>
      </Flex>
    </Box>
  )
}


export default PurchasedPage;
