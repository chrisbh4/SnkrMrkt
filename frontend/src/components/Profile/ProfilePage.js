import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react'
import { 
  FiUser, 
  FiShoppingBag, 
  FiTrendingUp,
  FiMail,
  FiUserCheck,
  FiSettings
} from 'react-icons/fi'
import ProfileUpdateForm from './profileModal'
import ChangePasswordForm from './changePasswordModal'

function ProfilePage () {
  const user = useSelector(state => state.session.user)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const sidebarBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const sidebarItems = [
    { href: '/profile', label: 'Profile', icon: FiUser, active: true },
    { href: '/purchased', label: 'Order History', icon: FiShoppingBag },
    { href: '/sell', label: 'Selling', icon: FiTrendingUp }
  ]

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
                  <Heading size="lg" color="gray.800">My Profile</Heading>
                  <Text color="gray.500">Manage your account settings and preferences</Text>
                </VStack>
                <HStack spacing={4}>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                      {user?.shoeSize || 'N/A'}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Shoe Size</Text>
                  </VStack>
                </HStack>
              </HStack>
            </Box>

            {/* Profile Information Cards */}
            <VStack spacing={6} align="stretch">
              {/* Personal Information */}
              <Box bg={cardBg} borderRadius="xl" p={6} shadow="sm" borderWidth="1px" borderColor={borderColor}>
                <VStack align="stretch" spacing={6}>
                  <HStack justify="space-between" align="center">
                    <HStack spacing={3}>
                      <Icon as={FiUserCheck} color="blue.500" boxSize={5} />
                      <Heading size="md" color="gray.800">Personal Information</Heading>
                    </HStack>
                  </HStack>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                    <GridItem>
                      <Box>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={2}>
                          Full Name
                        </Text>
                        <Text fontSize="lg" fontWeight="medium" color="gray.800">
                          {user?.firstName} {user?.lastName}
                        </Text>
                      </Box>
                    </GridItem>
                    
                    <GridItem>
                      <Box>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={2}>
                          Username
                        </Text>
                        <Text fontSize="lg" fontWeight="medium" color="gray.800">
                          {user?.username}
                        </Text>
                      </Box>
                    </GridItem>

                    <GridItem>
                      <Box>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={2}>
                          Email Address
                        </Text>
                        <HStack spacing={2}>
                          <Icon as={FiMail} color="gray.400" boxSize={4} />
                          <Text fontSize="lg" fontWeight="medium" color="gray.800">
                            {user?.email}
                          </Text>
                        </HStack>
                      </Box>
                    </GridItem>

                    <GridItem>
                      <Box>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={2}>
                          Shoe Size
                        </Text>
                        <Text fontSize="lg" fontWeight="medium" color="gray.800">
                          {user?.shoeSize || 'Not set'}
                        </Text>
                      </Box>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>

              {/* Account Actions */}
              <Box bg={cardBg} borderRadius="xl" p={6} shadow="sm" borderWidth="1px" borderColor={borderColor}>
                <VStack align="stretch" spacing={6}>
                  <HStack spacing={3}>
                    <Icon as={FiSettings} color="blue.500" boxSize={5} />
                    <Heading size="md" color="gray.800">Account Settings</Heading>
                  </HStack>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <GridItem>
                      <Box p={4} bg="gray.50" borderRadius="lg" borderWidth="1px" borderColor={borderColor} h="full">
                        <VStack spacing={3} align="stretch" h="full" justify="space-between">
                          <Text fontWeight="semibold" color="gray.700">
                            Update Profile Information
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Change your name, email, username, and shoe size
                          </Text>
                          <ProfileUpdateForm user={user} />
                        </VStack>
                      </Box>
                    </GridItem>

                    <GridItem>
                      <Box p={4} bg="gray.50" borderRadius="lg" borderWidth="1px" borderColor={borderColor} h="full">
                        <VStack spacing={3} align="stretch" h="full" justify="space-between">
                          <Text fontWeight="semibold" color="gray.700">
                            Change Password
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Update your account password for security
                          </Text>
                          <ChangePasswordForm user={user} />
                        </VStack>
                      </Box>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>

              {/* Account Statistics */}
              <Box bg={cardBg} borderRadius="xl" p={6} shadow="sm" borderWidth="1px" borderColor={borderColor}>
                <VStack align="stretch" spacing={6}>
                  <Heading size="md" color="gray.800">Account Overview</Heading>
                  
                  <StatGroup>
                    <Stat textAlign="center" p={4} bg="blue.50" borderRadius="lg">
                      <StatLabel color="blue.600">Member Since</StatLabel>
                      <StatNumber fontSize="lg" color="blue.700">
                        {new Date(user?.createdAt).getFullYear() || 'N/A'}
                      </StatNumber>
                    </Stat>
                    
                    <Stat textAlign="center" p={4} bg="green.50" borderRadius="lg">
                      <StatLabel color="green.600">Account Status</StatLabel>
                      <StatNumber fontSize="lg" color="green.700">
                        Active
                      </StatNumber>
                    </Stat>
                    
                    <Stat textAlign="center" p={4} bg="purple.50" borderRadius="lg">
                      <StatLabel color="purple.600">Profile Complete</StatLabel>
                      <StatNumber fontSize="lg" color="purple.700">
                        {user?.shoeSize ? '100%' : '90%'}
                      </StatNumber>
                    </Stat>
                  </StatGroup>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default ProfilePage
