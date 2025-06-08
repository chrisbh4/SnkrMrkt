import React, { useEffect, useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Box, 
  Link, 
  Flex, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Heading,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { fetchUsersOrdersList, fetchOrderSummary, clearOrderSummaryData } from '../../store/settings'
import OrderSummaryModal from './OrderSummaryModal'
import currency from 'currency.js'

function PurchasedPage () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session?.user)
  const orders = useSelector(state => state.settings.user?.Orders)
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const formattedDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`
    return formattedDate
  }

  const handleViewOrderSummary = async (order) => {
    if (!user) return
    
    setSelectedOrder(order)
    setIsLoadingSummary(true)
    onOpen()
    
    try {
      await dispatch(fetchOrderSummary(user.id, order.id))
    } catch (error) {
      console.error('Error fetching order summary:', error)
    } finally {
      setIsLoadingSummary(false)
    }
  }

  const handleCloseModal = () => {
    dispatch(clearOrderSummaryData())
    setSelectedOrder(null)
    onClose()
  }

  useEffect(() => {
    dispatch(fetchUsersOrdersList(user?.id))
  }, [dispatch, user])

  if (!orders) {
    return (
      <Box pos='relative' top='50px'>
        <Flex h='1000px'>
          <Box w='20%' pl='8px'>
            <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl'>Profile</Link></Flex>
            <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link as={ReactRouterLink} to='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Order History</Link></Flex>
            <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Selling</Link></Flex>
          </Box>
          <Box w='100%' p='5%'>
            <VStack spacing={4}>
              <Skeleton height="80px" />
              <Skeleton height="200px" />
              <Skeleton height="200px" />
            </VStack>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Box pos='relative' top='50px'>
      <Flex h='auto' minH='1000px'>
        <Box w='20%' pl='8px'>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/profile' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl'>Profile</Link></Flex>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link as={ReactRouterLink} to='/purchased' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Order History</Link></Flex>
          <Flex alignItems='center' h='60px' borderBottom='2px' _hover={{ color: 'black', fontWeight: '600' }}><Link href='/sell' _hover={{ textDecor: 'none' }} w='100%' fontSize='xl' pb='3%'>Selling</Link></Flex>
        </Box>
        <Box w='100%'>
          <Box>
            <Flex justify='space-between' w='75%' py='8px' pos='relative' left='5%' borderBottom='2px'>
              <Heading fontSize='30px'>Order History</Heading>
            </Flex>
            <Box px='5%' py='4'>
              {orders?.length === 0 ? (
                <Alert status="info" mt={4}>
                  <AlertIcon />
                  You haven't made any purchases yet.
                </Alert>
              ) : (
                orders?.map((order) => {
                  return (
                    <Box 
                      key={order?.id}
                      bg={bgColor} 
                      w={'40%'}
                      borderY="2px" 
                      borderColor={borderColor}
                      borderRadius="lg" 
                      p={6} 
                      mb={6}
                      shadow="sm"
                    >
                      {/* Order Header */}
                      <VStack align="stretch" spacing={4}>
                        <HStack justify="space-between" wrap="wrap">
                          <VStack align="flex-start" spacing={1}>
                            <Text fontSize="lg" fontWeight="bold">
                              Order #{order?.orderNumber}
                            </Text>
                            <Text color="gray.600">
                              Purchased on {formatDate(order?.createdAt)}
                            </Text>
                          </VStack>
                          <HStack spacing={3}>
                            <Badge colorScheme="green" fontSize="md" mr={5} p={2}>
                              Total: {currency(order?.totalAmount).format()}
                            </Badge>
                            <Button
                              colorScheme="blue"
                              size="sm"
                              onClick={() => handleViewOrderSummary(order)}
                              isLoading={isLoadingSummary && selectedOrder?.id === order.id}
                              loadingText="Loading..."
                            >
                              View Details
                            </Button>
                          </HStack>
                        </HStack>
                      </VStack>
                    </Box>
                  )
                })
              )}
            </Box>
          </Box>
        </Box>
      </Flex>

      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        isLoadingData={isLoadingSummary}
      />
    </Box>
  )
}

export default PurchasedPage
