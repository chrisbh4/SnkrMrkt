import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Link, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import * as sessionActions from '../../store/session'
import { purchaseFromCart } from '../../store/shoppingCart'

function ProfilePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)

  const logout = async (e) => {
    e.preventDefault()
    dispatch(purchaseFromCart())
    dispatch(sessionActions.logout())
    navigate('/')
  }

  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'>
        <Box w='20%' pl='8px'>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl'>Profile</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600" }} ><Link href='/payment' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex> */}
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Order History</Link></Flex>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Selling</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600" }} ><Link href='/watch' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex> */}
        </Box>
        <Box w='100%'>

          <Box>
            <Flex justify='space-between' w='75%' py='8px' pos='relative' left='5%' borderBottom='2px'>
              <Text fontSize='30px'>Profile</Text>
              {/* <Box >
                <Button bg='red.300' mr='15px'>Edit</Button>
                <Button onClick={logout} bg='red.300' >Log out</Button>
              </Box> */}
            </Flex>

            <SimpleGrid columns={3} spacing={10} px='5%' pt='2%'>
              <Box height='80px'>
                <Text>Full Name :</Text>
                <Text>Demo User</Text>
              </Box>
              <Box height='80px'>
                <Text>Username :</Text>
                <Text>{user?.username}</Text>
              </Box>
              <Box height='80px'>
                <Text>Shoe Size :</Text>
                <Text>13 Mens</Text>
              </Box>
              <Box height='80px'>
                <Text>Email :</Text>
                <Text>{user?.email}</Text>
              </Box>
              <Box height='80px'>
                <Text>Phone Number :</Text>
                <Text>333-444-5555</Text>
              </Box>
              {/* <Box height='80px'><Button bg='red.400'>Reset Password</Button></Box> */}
            </SimpleGrid>

          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default ProfilePage
