import React, { useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Box, 
  Link, 
  Flex, 
  Text, 
  VStack, 
  HStack, 
  Heading,
  useColorModeValue,
  Container,
  Icon,
  Avatar,
  Grid,
  GridItem,
  Image,
  Badge,
  Button,
  Skeleton,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { 
  FiUser, 
  FiShoppingBag, 
  FiTrendingUp,
  FiEdit
} from 'react-icons/fi'
import { fetchUserSellingList } from '../../store/settings'
import currency from 'currency.js'
import EditShoesFormChakra from '../Shoes/EditShoePage'

function SellingPage () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const shoes = useSelector(state => state.settings.Shoes)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const sidebarBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    dispatch(fetchUserSellingList(user?.id))
  }, [dispatch, user])

  // Function to refresh the selling list data
  const refreshSellingData = () => {
    if (user?.id) {
      dispatch(fetchUserSellingList(user.id))
    }
  }

  const sidebarItems = [
    { href: '/profile', label: 'Profile', icon: FiUser },
    { href: '/purchased', label: 'Order History', icon: FiShoppingBag },
    { href: '/sell', label: 'Selling', icon: FiTrendingUp, active: true }
  ]

  if (!shoes) {
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
                  <Heading size="lg" color="gray.800">My Listings</Heading>
                  <Text color="gray.500">Manage your sneaker listings and sales</Text>
                </VStack>
                <HStack spacing={4}>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="green.600">
                      {shoes?.length || 0}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Active Listings</Text>
                  </VStack>
                </HStack>
              </HStack>
            </Box>

            {/* Listings Grid */}
            {shoes?.length === 0 ? (
              <Box bg={cardBg} borderRadius="lg" p={6} borderWidth="1px" borderColor={borderColor}>
                <Alert status="info" borderRadius="lg" bg="blue.50" borderColor="blue.200">
                  <AlertIcon color="blue.500" />
                  <VStack align="flex-start" spacing={1}>
                    <Text fontWeight="semibold">No listings yet</Text>
                    <Text fontSize="sm">Start selling your sneakers to see them here.</Text>
                  </VStack>
                </Alert>
              </Box>
            ) : (
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                {shoes?.map((shoe) => (
                  <GridItem key={shoe.id}>
                    <Box
                      bg={cardBg}
                      borderRadius="xl"
                      overflow="hidden"
                      _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
                      transition="all 0.3s ease"
                      shadow="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                      h="450px"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box position="relative" flex="0 0 250px">
                        <Image
                          src={shoe.image}
                          alt={shoe.title}
                          h="250px"
                          w="100%"
                          objectFit="cover"
                          fallbackSrc="/placeholder-shoe.png"
                        />
                        <Badge
                          position="absolute"
                          top={3}
                          right={3}
                          colorScheme="green"
                          variant="solid"
                          borderRadius="full"
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          Listed
                        </Badge>
                      </Box>
                      
                      <Box p={5} flex="1" display="flex" flexDirection="column" justify="space-between">
                        {/* Title Section - Fixed Height */}
                        <Box h="60px" mb={3}>
                          <Text fontSize="lg" fontWeight="bold" noOfLines={2} color="gray.800" lineHeight="1.3">
                            {shoe.title}
                          </Text>
                        </Box>
                        
                        {/* Brand and Size - Fixed Height */}
                        <Box h="32px" mb={3}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.500" bg="gray.50" px={3} py={1} borderRadius="md">
                              {shoe.brand}
                            </Text>
                            <Text fontSize="sm" color="gray.500" bg="gray.50" px={3} py={1} borderRadius="md">
                              Size {shoe.shoeSize}
                            </Text>
                          </HStack>
                        </Box>
                        
                        {/* Price Section - Fixed Height */}
                        <Box h="32px" mb={4}>
                          <HStack justify="space-between" align="center">
                            <HStack spacing={1}>
                              <Text fontSize="xl" fontWeight="bold" color="green.600">
                                {currency(shoe.price).format()}
                              </Text>
                            </HStack>
                            <EditShoeButton shoe={shoe} onRefresh={refreshSellingData} />
                          </HStack>
                        </Box>
                      </Box>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

// Custom Edit Button Component
function EditShoeButton({ shoe, onRefresh }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    onClose()
    // Refresh the selling data after closing the modal
    if (onRefresh) {
      onRefresh()
    }
  }

  return (
    <>
      <Button
        leftIcon={<Icon as={FiEdit} />}
        colorScheme="gray"
        variant="outline"
        size="sm"
        fontSize="sm"
        onClick={onOpen}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Shoe</ModalHeader>
          <ModalCloseButton />
          <ModalBody w='full'>
            <EditShoesFormChakra onClose={handleClose} shoe={shoe} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SellingPage
