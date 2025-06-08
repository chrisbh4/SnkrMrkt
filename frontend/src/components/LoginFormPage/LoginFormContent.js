import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
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
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'

function LoginFormContent({ onClose }) {
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
  const borderColor = useColorModeValue('gray.200', 'gray.600')

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

  return (
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
            {credential && !fieldErrors.credential && (
              <InputRightElement>
                <FiCheck color="green" />
              </InputRightElement>
            )}
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

        
      </VStack>
    </form>
  )
}

export default LoginFormContent 