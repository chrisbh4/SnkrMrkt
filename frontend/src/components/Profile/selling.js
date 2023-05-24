import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Link, Flex, Text, SimpleGrid, Image, WrapItem, Wrap } from "@chakra-ui/react";
import { fetchUserSellingList } from "../../store/settings";
import ShoeList from "../OldHomePage/ShoeList";


function SellingPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const shoes = useSelector(state => state.settings.Shoes)


  useEffect(() => {
    dispatch(fetchUserSellingList(user?.id))
  }, [dispatch, user])


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
              <Text fontSize={'30px'}>Selling List</Text>
            </Flex>

            <Wrap w={"full"} padding={"3"} ml={"3%"}>
              {shoes?.map((shoe) => {
                return (
                  <WrapItem w={"20%"} _hover={{  boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
                    <ShoeList shoe={shoe} key={shoe.id} />
                  </WrapItem>
                )
              })}
            </Wrap>

          </Box>
        </Box>
      </Flex>
    </Box>
  )
}


export default SellingPage;
