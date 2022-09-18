import { Box, Button, Center, Image, VStack, Link, Flex, Text, SimpleGrid, GridItem } from "@chakra-ui/react";
import React from "react";




function ProfilePage() {

  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'    >
        <Box w='40%' bg='gray.300'>
          <Flex alignItems={'center'} h='70px' borderBottom={'2px'}><Text fontSize={'xl'}   >Profile</Text></Flex>
          <Flex alignItems={'center'} h='70px' borderBottom={'2px'}><Text fontSize={'xl'} pb='3%' >Settings</Text></Flex>
          <Flex alignItems={'center'} h='70px' borderBottom={'2px'}><Text fontSize={'xl'} pb='3%' >Buying</Text></Flex>
          <Flex alignItems={'center'} h='70px' borderBottom={'2px'}><Text fontSize={'xl'} pb='3%' >Selling</Text></Flex>
          <Flex alignItems={'center'} h='70px' borderBottom={'2px'}><Text fontSize={'xl'} pb='3%' >Following</Text></Flex>
        </Box>
        <Box w='100%' bg='gray.300'>

          <SimpleGrid columns={3} spacing={10} px='5%' pt='4%'>
            <Box bg='white' height='80px'>Name</Box>
            <Box bg='white' height='80px'>Shoe Size</Box>
            <Box bg='white' height='80px'>Email </Box>
            <Box bg='white' height='80px'>Username</Box>
            <Box bg='white' height='80px'>Phone Number</Box>
            <Box bg='white' height='80px'><Button bg='red.400'>Reset Password</Button></Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  )
}


export default ProfilePage;
