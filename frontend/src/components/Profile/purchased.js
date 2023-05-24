import React, {useEffect} from "react";
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Link, Flex, Text } from "@chakra-ui/react";
import { fetchUsersOrdersList } from "../../store/settings";


function PurchasedPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const orders = useSelector(state => state.settings.user?.Orders)


  useEffect(() => {
    dispatch(fetchUsersOrdersList(user?.id))
}, [dispatch, user])


  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'    >
        <Box w='20%' pl='8px'>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} >Profile</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/payment' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Orders</Link></Flex>
          <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Selling</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Link href='/watch' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex> */}
        </Box>
        <Box w='100%'>

          <Box>
            <Flex justify={'space-between'} w='75%' py='8px' pos='relative' left='5%' borderBottom={'2px'}>
              <Text fontSize={'30px'}>Orders</Text>
            </Flex>



            <Box px='5%' pt='2%'>
            {orders?.map((order) =>{
              return(
                <Flex h={"14"} fontSize={"lg"} >
                  <Text>Order Number: {order?.id}00{order?.id}0</Text>
                  <Text ml={"3%"}>Purchased Date: {order?.createdAt}</Text>
                </Flex>
              )
            })}
            </Box>

          </Box>
        </Box>
      </Flex>
    </Box>
  )
}


export default PurchasedPage;
