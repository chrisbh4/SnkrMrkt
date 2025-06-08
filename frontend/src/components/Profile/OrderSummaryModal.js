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
  AccordionIcon
} from '@chakra-ui/react'
import { FiPackage, FiCalendar, FiDollarSign, FiTag } from 'react-icons/fi'
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
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxH="90vh">
        <ModalHeader>
          <HStack spacing={3}>
            <Icon as={FiPackage} />
            <Text>Order #{order?.orderNumber}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Order Overview */}
            <Box p={4} bg={cardBg} borderRadius="md">
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                <Stat>
                  <StatLabel>
                    <HStack>
                      <Icon as={FiCalendar} />
                      <Text>Order Date</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="md">
                    {formatDate(order?.createdAt)}
                  </StatNumber>
                </Stat>
                
                <Stat>
                  <StatLabel>
                    <HStack>
                      <Icon as={FiDollarSign} />
                      <Text>Total Amount</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber color="green.500">
                    {currency(order?.totalAmount || 0).format()}
                  </StatNumber>
                </Stat>
                
                <Stat>
                  <StatLabel>
                    <HStack>
                      <Icon as={FiTag} />
                      <Text>Items</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize="md">
                    {order?.shoeIds?.length || 0} shoes
                  </StatNumber>
                </Stat>
              </Grid>
            </Box>

            <Divider />

            {/* Shipping Information */}
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="md">Shipping Information</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={3}>
                    <HStack>
                      <Text fontWeight="semibold" minW="120px">Name:</Text>
                      <Text>{order?.firstName} {order?.lastName}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="semibold" minW="120px">Email:</Text>
                      <Text>{order?.email}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="semibold" minW="120px">Address:</Text>
                      <Text>
                        {order?.address}
                        {order?.otherAddress && `, ${order.otherAddress}`}
                        <br />
                        {order?.city}, {order?.stateProvince} {order?.postalCode}
                        <br />
                        {order?.country}
                      </Text>
                    </HStack>
                    {order?.phoneNumber && (
                      <HStack>
                        <Text fontWeight="semibold" minW="120px">Phone:</Text>
                        <Text>{order.phoneNumber}</Text>
                      </HStack>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Divider />

            {/* Order Items Section */}
            <Box>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Order Items</Heading>
              </Flex>

              {error && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {isLoadingData && (
                <Flex justify="center" p={8}>
                  <VStack>
                    <Spinner size="xl" />
                    <Text>Fetching detailed shoe information...</Text>
                  </VStack>
                </Flex>
              )}

              {isCorrectOrderData && orderSummary?.sneakers ? (
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  {orderSummary.sneakers.map((sneaker, index) => (
                    <GridItem key={index}>
                      <Box
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                        overflow="hidden"
                        _hover={{ shadow: 'md' }}
                        transition="all 0.2s"
                      >
                        <Image
                          src={sneaker.thumbnail}
                          alt={sneaker.title}
                          h="250px"
                          w="100%"
                          objectFit="cover"
                          fallbackSrc="/placeholder-shoe.png"
                        />
                        <Box p={4}>
                          <VStack align="stretch" spacing={2}>
                            <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                              {sneaker.title}
                            </Text>
                            
                            <Text fontSize="sm" color="gray.500">
                              Style ID: {sneaker.styleID}
                            </Text>
                            
                            <HStack justify="space-between">
                              <Text fontSize="lg" fontWeight="semibold" color="green.500">
                                {sneaker.price !== 'N/A' ? currency(sneaker.price).format() : 'N/A'}
                              </Text>
                              <Badge colorScheme="green" variant="outline">
                                Live Data
                              </Badge>
                            </HStack>
                          </VStack>
                        </Box>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              ) : !isLoadingData && (
                <Box p={8} textAlign="center" bg={cardBg} borderRadius="md">
                  <VStack spacing={3}>
                    <Icon as={FiPackage} size="48px" color="gray.400" />
                    <Text color="gray.500">
                      Loading shoe information...
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Fetching current prices and details using styleIDs from the Sneaks API
                    </Text>
                  </VStack>
                </Box>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderSummaryModal 