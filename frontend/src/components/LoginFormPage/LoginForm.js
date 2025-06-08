import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Center,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
  Divider,
  useColorModeValue,
  IconButton,
  Spinner,
  useToast
} from '@chakra-ui/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import SignUpFormContent from '../SignupFormPage/SignupFormContent'

function LoginForm () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  
  // Form state
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const tabSelectedColor = useColorModeValue('blue.500', 'blue.200')

  // Form validation
  const validateField = (field, value) => {
    const newFieldErrors = { ...fieldErrors }
    
    switch (field) {
      case 'credential':
        if (!value.trim()) {
          newFieldErrors.credential = 'Email or username is required'
        } else if (value.includes('@') && !/\S+@\S+\.\S+/.test(value)) {
          newFieldErrors.credential = 'Please enter a valid email address'
        } else {
          delete newFieldErrors.credential
        }
        break
      case 'password':
        if (!value) {
          newFieldErrors.password = 'Password is required'
        } else if (value.length < 6) {
          newFieldErrors.password = 'Password must be at least 6 characters'
        } else {
          delete newFieldErrors.password
        }
        break
      default:
        break
    }
    
    setFieldErrors(newFieldErrors)
    return Object.keys(newFieldErrors).length === 0
  }

  const handleCredentialChange = (e) => {
    const value = e.target.value
    setCredential(value)
    validateField('credential', value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    validateField('password', value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const isCredentialValid = validateField('credential', credential)
    const isPasswordValid = validateField('password', password)
    
    if (!isCredentialValid || !isPasswordValid) {
      return
    }

    setIsLoading(true)
    setErrors([])
    
    try {
      const data = await dispatch(sessionActions.login({ credential, password }))
      if (data?.errors) {
        setErrors(data.errors)
        toast({
          title: 'Login Failed',
          description: 'Please check your credentials and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
        navigate('/home')
      }
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    onClose()
    // Reset form state
    setCredential('')
    setPassword('')
    setErrors([])
    setFieldErrors({})
    setShowPassword(false)
    setIsLoading(false)
  }

  return (
    <>
      <Button
        onClick={onOpen}
        color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.7em 4em'
        _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
      >
        Log In
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={handleModalClose} 
        size="lg"
        closeOnOverlayClick={!isLoading}
        closeOnEsc={!isLoading}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent
          bg={bgColor}
          borderRadius="xl"
          shadow="2xl"
          mx={4}
        >
          <ModalHeader
            bg="gradient-to-r"
            bgGradient="linear(to-r, blue.500, purple.600)"
            color="white"
            borderTopRadius="xl"
            py={6}
          >
            <Center>
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  SNKR MRKT
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  Welcome to the sneaker marketplace
                </Text>
              </VStack>
            </Center>
          </ModalHeader>
          
          <ModalCloseButton 
            color="white" 
            size="lg"
            _hover={{ bg: 'whiteAlpha.200' }}
            disabled={isLoading}
          />

          <ModalBody p={0}>
            <Tabs variant="soft-rounded" colorScheme="blue" p={6}>
              <TabList mb={6} bg="gray.50" p={1} borderRadius="lg">
                <Tab 
                  flex={1}
                  _selected={{ 
                    color: 'white', 
                    bg: tabSelectedColor,
                    shadow: 'md'
                  }}
                  fontWeight="semibold"
                >
                  <FiUser className="mr-2" />
                  Log In
                </Tab>
                <Tab 
                  flex={1}
                  _selected={{ 
                    color: 'white', 
                    bg: tabSelectedColor,
                    shadow: 'md'
                  }}
                  fontWeight="semibold"
                >
                  <FiUser className="mr-2" />
                  Sign Up
                </Tab>
              </TabList>

              <TabPanels>
                {/* Login Panel */}
                <TabPanel p={0}>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                      {/* Error Display */}
                      {errors.length > 0 && (
                        <Alert status="error" borderRadius="md">
                          <AlertIcon />
                          <AlertDescription>
                            {errors.map((error, idx) => (
                              <Text key={idx}>{error}</Text>
                            ))}
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Email/Username Field */}
                      <FormControl isInvalid={fieldErrors.credential}>
                        <FormLabel color="gray.700" fontWeight="semibold">
                          Email or Username
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <FiMail color="gray.400" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            value={credential}
                            onChange={handleCredentialChange}
                            placeholder="Enter your email or username"
                            size="lg"
                            borderColor={borderColor}
                            _hover={{ borderColor: 'blue.300' }}
                            _focus={{ 
                              borderColor: 'blue.500',
                              shadow: '0 0 0 1px blue.500'
                            }}
                            disabled={isLoading}
                          />
                        </InputGroup>
                        <FormErrorMessage>{fieldErrors.credential}</FormErrorMessage>
                      </FormControl>

                      {/* Password Field */}
                      <FormControl isInvalid={fieldErrors.password}>
                        <FormLabel color="gray.700" fontWeight="semibold">
                          Password
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <FiLock color="gray.400" />
                          </InputLeftElement>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            size="lg"
                            borderColor={borderColor}
                            _hover={{ borderColor: 'blue.300' }}
                            _focus={{ 
                              borderColor: 'blue.500',
                              shadow: '0 0 0 1px blue.500'
                            }}
                            disabled={isLoading}
                          />
                          <InputRightElement width="3rem">
                            <IconButton
                              h="2rem"
                              size="sm"
                              variant="ghost"
                              onClick={() => setShowPassword(!showPassword)}
                              icon={showPassword ? <FiEyeOff /> : <FiEye />}
                              disabled={isLoading}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{fieldErrors.password}</FormErrorMessage>
                      </FormControl>

                      {/* Login Button */}
                      <Button
                        type="submit"
                        size="lg"
                        width="full"
                        bgGradient="linear(to-r, blue.500, purple.600)"
                        color="white"
                        _hover={{
                          bgGradient: "linear(to-r, blue.600, purple.700)",
                          transform: 'translateY(-2px)',
                          shadow: 'lg'
                        }}
                        _active={{
                          transform: 'translateY(0)',
                        }}
                        isLoading={isLoading}
                        loadingText="Logging in..."
                        spinner={<Spinner size="sm" />}
                        disabled={Object.keys(fieldErrors).length > 0}
                        transition="all 0.2s"
                      >
                        Log In
                      </Button>

                      <Divider />

                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Don't have an account?{' '}
                        <Link color="blue.500" fontWeight="semibold">
                          Sign up here
                        </Link>
                      </Text>
                    </VStack>
                  </form>
                </TabPanel>

                {/* Signup Panel */}
                <TabPanel p={0}>
                  <SignUpFormContent onClose={handleModalClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginForm
