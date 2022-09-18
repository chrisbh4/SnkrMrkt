import React from "react";
import { Box, Button, Center, Image, VStack, Link, Flex, Text, SimpleGrid, GridItem, Wrap, WrapItem, Avatar } from "@chakra-ui/react";




function ProfilePage() {

  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'    >
        <Box w='20%' pl='8px'>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'}_hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/home' _hover={{textDecor: 'none'}} w='100%' fontSize={'xl'} >Profile</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'}_hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/home' _hover={{textDecor: 'none'}} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'}_hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/home' _hover={{textDecor: 'none'}} w='100%' fontSize={'xl'} pb='3%' >Buying</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'}_hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/home' _hover={{textDecor: 'none'}} w='100%' fontSize={'xl'} pb='3%' >Selling</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'}_hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/home' _hover={{textDecor: 'none'}} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex>
        </Box>
        <Box w='100%' bg=''>

          <Box>
            <Flex justify={'space-between'} w='75%' py='8px' pos='relative' left='5%' borderBottom={'2px'}>
              <Text fontSize={'30px'}>Profile</Text>
              <Button bg='red.300'>Edit</Button>
            </Flex>

            <Wrap pl='6%' pt='10px'>
              <WrapItem>
                <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
              </WrapItem>
            </Wrap>


            <SimpleGrid columns={3} spacing={10} px='5%' pt='2%'>
              <Box height='80px'>
                <Text >Name :</Text>
                <Text >Christian Brown</Text>
              </Box>
              <Box height='80px'>
                <Text>Shoe Size :</Text>
                <Text>13 M</Text>
              </Box>
              <Box height='80px'>
                <Text>Email :</Text>
                <Text>chris@gmail.com</Text>
              </Box>
              <Box height='80px'>
                <Text>Username :</Text>
                <Text>Chris_da_creator</Text>
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


export default ProfilePage;
