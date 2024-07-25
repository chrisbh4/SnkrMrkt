import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Link, Flex, Text, Image, VStack } from '@chakra-ui/react'
import { fetchUsersOrdersList } from '../../store/settings'
import currency from 'currency.js'

function PurchasedPage () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const orders = useSelector(state => state.settings.user?.Orders)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const formattedDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`
    return formattedDate
  }

  useEffect(() => {
    dispatch(fetchUsersOrdersList(user?.id))
  }, [dispatch, user])

  return (
    <Box pos='relative' top='50px'>
      <Flex h='1000px'>
        <Box w='20%' pl='8px'>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl'>Profile</Link></Flex>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Order History</Link></Flex>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Selling</Link></Flex>
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600" }} ><Link href='/payment' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Payment Settings</Link></Flex> */}
          {/* <Flex alignItems={'center'} h='60px' borderBottom={'2px'} _hover={{ color: "black", fontWeight: "600" }} ><Link href='/watch' _hover={{ textDecor: 'none' }} w='100%' fontSize={'xl'} pb='3%' >Watching</Link></Flex> */}
        </Box>
        <Box w='100%'>
          <Box>
            <Flex justify='space-between' w='75%' py='8px' pos='relative' left='5%' borderBottom='2px'>
              <Text fontSize='30px'>Order History</Text>
            </Flex>
            <Box px='5%'>
              {orders?.map((order) => {
                return (
                  <Flex h='auto' fontSize='lg' borderBottom='2px' key={order?.id}>
                    <VStack width='30%' pt='4%' align='flex-start'>
                      <Text>Order Number: {order?.orderNumber}</Text>
                      <Text ml='3%'>Purchase Date: {formatDate(order?.createdAt)}</Text>
                      <Text ml='3%'>Total: {currency(order?.totalAmount).format()}</Text>
                    </VStack>
                    <Flex w='full' wrap='wrap'>
                      {order?.images.map((img, index) => {
                        return <Image src={img} key={index} boxSize='200px' ml='2%' />
                      })}
                    </Flex>
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

export default PurchasedPage
