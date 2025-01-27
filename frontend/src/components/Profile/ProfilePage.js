import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Link, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import ProfileUpdateForm from './profileModal'
import ChangePasswordForm from './changePasswordModal'

function ProfilePage () {
  const user = useSelector(state => state.session.user)

  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'>
        <Box w='20%' pl='8px'>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl'>Profile</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600" }} ><Link href='/payment' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex> */}
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link as={ReactRouterLink} to='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Order History</Link></Flex>
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
                <Text>{user?.firstName} {user?.lastName}</Text>
              </Box>
              <Box height='80px'>
                <Text>Username :</Text>
                <Text>{user?.username}</Text>
              </Box>
              <Box height='80px'>
                <Text>Shoe Size :</Text>
                <Text>{user?.shoeSize}</Text>
              </Box>
              <Box height='80px'>
                <Text>Email :</Text>
                <Text>{user?.email}</Text>
              </Box>
              {/* <Box height='80px'>
                <Text>Phone Number :</Text>
                <Text>{user?.phoneNumber}</Text>
              </Box> */}
              <Box height='80px' w={'full'}>
                <ProfileUpdateForm user={user} bg='black' textColor={'white'} />
              </Box>
              <Box height='80px' w={'full'}>
                <ChangePasswordForm user={user} bg='red' textColor={'white'} />
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default ProfilePage
