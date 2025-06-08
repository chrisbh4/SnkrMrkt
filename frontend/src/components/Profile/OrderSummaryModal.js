import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Grid,
  GridItem,
  Divider,
  Heading,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container
} from '@chakra-ui/react'
import { FiPackage, FiCalendar, FiDollarSign, FiTag, FiMapPin, FiMail, FiPhone, FiUser } from 'react-icons/fi'
import { fetchOrderSummary } from '../../store/settings'
import currency from 'currency.js'

function OrderSummaryModal({ isOpen, onClose, order, isLoadingData }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session?.user)
  const orderSummary = useSelector(state => state.settings?.orderSummary)
  const [error, setError] = useState(null)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const gradientBg = useColorModeValue('linear(to-r, blue.50, purple.50)', 'linear(to-r, blue.900, purple.900)')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  // Check if the order summary matches the current selected order
  const isCorrectOrderData = orderSummary && order && orderSummary.id === order.id

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent bg={bgColor} maxH="90vh" borderRadius="2xl" shadow="2xl" border="1px" borderColor={borderColor}>
        <ModalHeader bg={gradientBg} borderTopRadius="2xl" py={6}>
          <HStack spacing={4}>
            <Icon as={FiPackage} boxSize={6} color="blue.600" />
            <VStack align="flex-start" spacing={1}>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Order #{order?.orderNumber}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Order Details & Items
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        
        <ModalBody px={8} py={6}>
          <VStack spacing={8} align="stretch">
            {/* Order Overview Stats */}
            <Box bg={cardBg} borderRadius="xl" shadow="sm" borderWidth="1px" borderColor={borderColor}>
              <Box p={6}>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                  <Stat textAlign="center">
                    <StatLabel>
                      <HStack justify="center" spacing={2}>
                        <Icon as={FiCalendar} color="blue.500" />
                        <Text>Order Date</Text>
                      </HStack>
                    </StatLabel>
                    <StatNumber fontSize="lg" color="gray.700" mt={2}>
                      {formatDate(order?.createdAt)}
                    </StatNumber>
                  </Stat>
                  
                  <Stat textAlign="center">
                    <StatLabel>
                      <HStack justify="center" spacing={2}>
                        <Icon as={FiDollarSign} color="green.500" />
                        <Text>Total Amount</Text>
                      </HStack>
                    </StatLabel>
                    <StatNumber fontSize="2xl" color="green.600" mt={2}>
                      {currency(order?.totalAmount || 0).format()}
                    </StatNumber>
                  </Stat>
                  
                  <Stat textAlign="center">
                    <StatLabel>
                      <HStack justify="center" spacing={2}>
                        <Icon as={FiTag} color="purple.500" />
                        <Text>Items</Text>
                      </HStack>
                    </StatLabel>
                    <StatNumber fontSize="lg" color="gray.700" mt={2}>
                      {order?.shoeIds?.length || 0} shoes
                    </StatNumber>
                  </Stat>
                </Grid>
              </Box>
            </Box>

            {/* Shipping Information */}
            <Box bg={cardBg} borderRadius="xl" shadow="sm" borderWidth="1px" borderColor={borderColor}>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton px={6} py={4} _hover={{ bg: 'transparent' }}>
                    <Box flex="1" textAlign="left">
                      <HStack spacing={3}>
                        <Icon as={FiMapPin} color="blue.500" boxSize={5} />
                        <Heading size="md" color="gray.800">Shipping Information</Heading>
                      </HStack>
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel px={6} pb={6}>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <VStack align="stretch" spacing={4}>
                        <HStack spacing={3}>
                          <Icon as={FiUser} color="gray.400" boxSize={4} />
                          <VStack align="flex-start" spacing={0}>
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">Name</Text>
                            <Text fontWeight="medium">{order?.firstName} {order?.lastName}</Text>
                          </VStack>
                        </HStack>
                        <HStack spacing={3}>
                          <Icon as={FiMail} color="gray.400" boxSize={4} />
                          <VStack align="flex-start" spacing={0}>
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">Email</Text>
                            <Text fontWeight="medium">{order?.email}</Text>
                          </VStack>
                        </HStack>
                        {order?.phoneNumber && (
                          <HStack spacing={3}>
                            <Icon as={FiPhone} color="gray.400" boxSize={4} />
                            <VStack align="flex-start" spacing={0}>
                              <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">Phone</Text>
                              <Text fontWeight="medium">{order.phoneNumber}</Text>
                            </VStack>
                          </HStack>
                        )}
                      </VStack>
                      <VStack align="stretch" spacing={4}>
                        <HStack spacing={3} align="flex-start">
                          <Icon as={FiMapPin} color="gray.400" boxSize={4} mt={1} />
                          <VStack align="flex-start" spacing={0}>
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">Address</Text>
                            <Text fontWeight="medium" lineHeight="1.5">
                              {order?.address}
                              {order?.otherAddress && (
                                <>
                                  <br />
                                  {order.otherAddress}
                                </>
                              )}
                              <br />
                              {order?.city}, {order?.stateProvince} {order?.postalCode}
                              <br />
                              {order?.country}
                            </Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </Grid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            {/* Order Items Section */}
            <Box bg={cardBg} borderRadius="xl" shadow="sm" borderWidth="1px" borderColor={borderColor}>
              <Box p={6}>
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between" align="center">
                    <HStack spacing={3}>
                      <Icon as={FiPackage} color="blue.500" boxSize={5} />
                      <Heading size="md" color="gray.800">Order Items</Heading>
                    </HStack>
                  </HStack>

                  {error && (
                    <Alert status="error" borderRadius="lg">
                      <AlertIcon />
                      <Text>{error}</Text>
                    </Alert>
                  )}

                  {isLoadingData && (
                    <Box py={12}>
                      <VStack spacing={4}>
                        <Spinner size="xl" color="blue.500" thickness="4px" />
                        <VStack spacing={2}>
                          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                            Loading Sneaker Details
                          </Text>
                          <Text color="gray.500" textAlign="center">
                            Fetching live market data from Sneaks API...
                          </Text>
                        </VStack>
                      </VStack>
                    </Box>
                  )}

                  {isCorrectOrderData && orderSummary?.sneakers ? (
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                      {orderSummary.sneakers.map((sneaker, index) => (
                        <GridItem key={index}>
                          <Box
                            bg="white"
                            borderRadius="xl"
                            overflow="hidden"
                            _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
                            transition="all 0.3s ease"
                            shadow="md"
                            borderWidth="1px"
                            borderColor="gray.100"
                          >
                            <Box position="relative">
                              <Image
                                src={sneaker.thumbnail}
                                alt={sneaker.title}
                                h="250px"
                                w="100%"
                                objectFit="cover"
                                fallbackSrc="/placeholder-shoe.png"
                              />

                            </Box>
                            <Box p={5}>
                              <VStack align="stretch" spacing={3}>
                                <Text fontSize="md" fontWeight="bold" noOfLines={2} color="gray.800">
                                  {sneaker.title}
                                </Text>
                                
                                <Text fontSize="sm" color="gray.500" bg="gray.50" px={3} py={1} borderRadius="md">
                                  Style ID: {sneaker.styleID}
                                </Text>
                                
                                <Flex justify="space-between" align="center">
                                  <Text fontSize="xl" fontWeight="bold" color="green.600">
                                    {sneaker.price !== 'N/A' ? currency(sneaker.price).format() : 'N/A'}
                                  </Text>
                                </Flex>
                              </VStack>
                            </Box>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  ) : !isLoadingData && (
                    <Box py={12} textAlign="center">
                      <VStack spacing={4}>
                        <Icon as={FiPackage} size="64px" color="gray.300" />
                        <VStack spacing={2}>
                          <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                            Loading Sneaker Information
                          </Text>
                          <Text color="gray.500" maxW="md" mx="auto">
                            We're fetching the latest details and prices for your sneakers using their style IDs from the Sneaks API
                          </Text>
                        </VStack>
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </Box>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter bg={cardBg} borderBottomRadius="2xl" py={6}>
          <Button 
            variant="ghost" 
            mr={3} 
            onClick={handleClose}
            size="lg"
            borderRadius="lg"
            px={8}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderSummaryModal 