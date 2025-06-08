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
  useDisclosure,
  Container,
  Icon,
  Divider,
  Avatar,
  Stack
} from '@chakra-ui/react'
import { 
  FiUser, 
  FiShoppingBag, 
  FiPackage, 
  FiEye,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp
} from 'react-icons/fi'
import { fetchUsersOrdersList, fetchOrderSummary, clearOrderSummaryData } from '../../store/settings'
import OrderSummaryModal from './OrderSummaryModal'
import currency from 'currency.js'

function PurchasedPage () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session?.user)
  const orders = useSelector(state => state.settings.user?.Orders)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const sidebarBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    })
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

  const sidebarItems = [
    { href: '/profile', label: 'Profile', icon: FiUser },
    { href: '/purchased', label: 'Order History', icon: FiShoppingBag, active: true },
    { href: '/sell', label: 'Selling', icon: FiTrendingUp }
  ]

  if (!orders) {
    return (
      <Box bg={bgColor} minH="100vh" pt="60px">
        <Container maxW="7xl" py={8}>
          <Flex gap={8}>
            {/* Sidebar */}
            <Box w="280px" bg={sidebarBg} borderRadius="xl" p={6} shadow="sm" h="fit-content">
              <VStack align="stretch" spacing={1}>
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    as={ReactRouterLink}
                    to={item.href}
                    _hover={{ textDecor: 'none' }}
                  >
                    <HStack
                      p={3}
                      borderRadius="lg"
                      bg={item.active ? 'blue.50' : 'transparent'}
                      color={item.active ? 'blue.600' : 'gray.600'}
                      _hover={{ bg: item.active ? 'blue.50' : 'gray.50' }}
                      transition="all 0.2s"
                    >
                      <Icon as={item.icon} />
                      <Text fontWeight={item.active ? 'semibold' : 'medium'}>
                        {item.label}
                      </Text>
                    </HStack>
                  </Link>
                ))}
              </VStack>
            </Box>

            {/* Main Content */}
            <Box flex={1}>
              <VStack spacing={4} align="stretch">
                <Skeleton height="60px" borderRadius="lg" />
                <Skeleton height="200px" borderRadius="lg" />
                <Skeleton height="200px" borderRadius="lg" />
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    )
  }

  return (
    <Box bg={bgColor} minH="100vh" pt="60px">
      <Container maxW="7xl" py={8}>
        <Flex gap={8}>
          {/* Professional Sidebar */}
          <Box w="280px" bg={sidebarBg} borderRadius="xl" p={6} shadow="sm" h="fit-content" borderWidth="1px" borderColor={borderColor}>
            {/* User Profile Section */}
            <VStack spacing={4} pb={6} borderBottom="1px" borderColor={borderColor}>
              <Avatar size="lg" name={user?.firstName + ' ' + user?.lastName} />
              <VStack spacing={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {user?.email}
                </Text>
              </VStack>
            </VStack>

            {/* Navigation */}
            <VStack align="stretch" spacing={1} pt={6}>
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  as={ReactRouterLink}
                  to={item.href}
                  _hover={{ textDecor: 'none' }}
                >
                  <HStack
                    p={4}
                    borderRadius="lg"
                    bg={item.active ? 'blue.50' : 'transparent'}
                    color={item.active ? 'blue.600' : 'gray.600'}
                    _hover={{ bg: item.active ? 'blue.100' : 'gray.50', transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    borderLeft="3px solid"
                    borderColor={item.active ? 'blue.500' : 'transparent'}
                  >
                    <Icon as={item.icon} boxSize={5} />
                    <Text fontWeight={item.active ? 'semibold' : 'medium'} fontSize="md">
                      {item.label}
                    </Text>
                  </HStack>
                </Link>
              ))}
            </VStack>
          </Box>

          {/* Main Content Area */}
          <Box flex={1}>
            {/* Header */}
            <Box bg={cardBg} borderRadius="xl" p={6} shadow="sm" mb={6} borderWidth="1px" borderColor={borderColor}>
              <HStack justify="space-between" align="center">
                <VStack align="flex-start" spacing={1}>
                  <Heading size="lg" color="gray.800">Order History</Heading>
                  <Text color="gray.500">Track and manage your sneaker purchases</Text>
                </VStack>
                <HStack spacing={4}>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                      {orders?.length || 0}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Total Orders</Text>
                  </VStack>
                </HStack>
              </HStack>
            </Box>

            {/* Orders List */}
            <VStack spacing={4} align="stretch">
              {orders?.length === 0 ? (
                <Box bg={cardBg} borderRadius="lg" p={6} borderWidth="1px" borderColor={borderColor}>
                  <Alert status="info" borderRadius="lg" bg="blue.50" borderColor="blue.200">
                    <AlertIcon color="blue.500" />
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="semibold">No orders yet</Text>
                      <Text fontSize="sm">Start shopping to see your order history here.</Text>
                    </VStack>
                  </Alert>
                </Box>
              ) : (
                orders?.map((order) => (
                  <Box 
                    key={order?.id}
                    bg={cardBg} 
                    borderRadius="lg"
                    p={6}
                    borderWidth="1px"
                    borderColor={borderColor}
                    _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <Stack spacing={4}>
                      {/* Order Header */}
                      <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
                        <VStack align="flex-start" spacing={2}>
                          <HStack spacing={3}>
                            <Icon as={FiPackage} color="blue.500" boxSize={5} />
                            <Heading size="md" color="gray.800">
                              Order #{order?.orderNumber}
                            </Heading>
                          </HStack>
                          <HStack spacing={4} color="gray.500" fontSize="sm">
                            <HStack spacing={1}>
                              <Icon as={FiCalendar} boxSize={4} />
                              <Text>{formatDate(order?.createdAt)}</Text>
                            </HStack>
                            <HStack spacing={1}>
                              <Icon as={FiShoppingBag} boxSize={4} />
                              <Text>{order?.shoeIds?.length || 0} items</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                        
                        <HStack spacing={4} align="center">
                          <VStack spacing={1} align="flex-end" mr={8}>
                            <HStack spacing={1}>
                              <Text fontSize="xl" fontWeight="bold" color="green.600">
                                {currency(order?.totalAmount).format()}
                              </Text>
                            </HStack>
                            <Badge colorScheme="green" variant="subtle" borderRadius="full" px={3} py={1}>
                              Completed
                            </Badge>
                          </VStack>
                          
                          <Button
                            leftIcon={<Icon as={FiEye} />}
                            colorScheme="blue"
                            variant="outline"
                            size="md"
                            onClick={() => handleViewOrderSummary(order)}
                            isLoading={isLoadingSummary && selectedOrder?.id === order.id}
                            loadingText="Loading..."
                            borderRadius="lg"
                            fontWeight="medium"
                          >
                            View Details
                          </Button>
                        </HStack>
                      </Flex>
                    </Stack>
                  </Box>
                ))
              )}
            </VStack>
          </Box>
        </Flex>
      </Container>

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
