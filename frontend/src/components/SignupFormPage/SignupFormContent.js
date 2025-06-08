import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
  IconButton,
  Spinner,
  useToast,
  Progress,
  Box
} from '@chakra-ui/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheck } from 'react-icons/fi'

function SignUpFormContent({ onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)
  const toast = useToast()

  // Form state
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  // Color mode values
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  if (sessionUser) return navigate('/')

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let score = 0
    if (password.length >= 8) score += 25
    if (/[A-Z]/.test(password)) score += 25
    if (/[0-9]/.test(password)) score += 25
    if (/[^A-Za-z0-9]/.test(password)) score += 25
    return score
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength < 50) return 'red'
    if (strength < 75) return 'yellow'
    return 'green'
  }

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak'
    if (strength < 50) return 'Weak'
    if (strength < 75) return 'Good'
    return 'Strong'
  }

  // Form validation
  const validateField = (field, value) => {
    const newFieldErrors = { ...fieldErrors }
    
    switch (field) {
      case 'email':
        if (!value.trim()) {
          newFieldErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newFieldErrors.email = 'Please enter a valid email address'
        } else {
          delete newFieldErrors.email
        }
        break
      case 'username':
        if (!value.trim()) {
          newFieldErrors.username = 'Username is required'
        } else if (value.length < 3) {
          newFieldErrors.username = 'Username must be at least 3 characters'
        } else if (value.length > 30) {
          newFieldErrors.username = 'Username must be less than 30 characters'
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newFieldErrors.username = 'Username can only contain letters, numbers, and underscores'
        } else {
          delete newFieldErrors.username
        }
        break
      case 'password':
        if (!value) {
          newFieldErrors.password = 'Password is required'
        } else if (value.length < 8) {
          newFieldErrors.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          newFieldErrors.password = 'Password must contain uppercase, lowercase, number, and special character'
        } else {
          delete newFieldErrors.password
        }
        break
      case 'confirmPassword':
        if (!value) {
          newFieldErrors.confirmPassword = 'Please confirm your password'
        } else if (value !== password) {
          newFieldErrors.confirmPassword = 'Passwords do not match'
        } else {
          delete newFieldErrors.confirmPassword
        }
        break
      default:
        break
    }
    
    setFieldErrors(newFieldErrors)
    return Object.keys(newFieldErrors).length === 0
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    validateField('email', value)
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setUsername(value)
    validateField('username', value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    validateField('password', value)
    // Re-validate confirm password if it exists
    if (confirmPassword) {
      validateField('confirmPassword', confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    validateField('confirmPassword', value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const isEmailValid = validateField('email', email)
    const isUsernameValid = validateField('username', username)
    const isPasswordValid = validateField('password', password)
    const isConfirmPasswordValid = validateField('confirmPassword', confirmPassword)
    
    if (!isEmailValid || !isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
      return
    }

    setIsLoading(true)
    setErrors([])
    
    try {
      const data = await dispatch(sessionActions.signup({ email, username, password }))
      if (data?.errors) {
        setErrors(data.errors)
        toast({
          title: 'Registration Failed',
          description: 'Please check your information and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Welcome to SNKR MRKT!',
          description: 'Your account has been created successfully.',
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

  const passwordStrength = getPasswordStrength(password)

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

        {/* Email Field */}
        <FormControl isInvalid={fieldErrors.email}>
          <FormLabel color="gray.700" fontWeight="semibold">
            Email Address
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiMail color="gray.400" />
            </InputLeftElement>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              size="lg"
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.300' }}
              _focus={{ 
                borderColor: 'blue.500',
                shadow: '0 0 0 1px blue.500'
              }}
              disabled={isLoading}
            />
            {email && !fieldErrors.email && (
              <InputRightElement>
                <FiCheck color="green" />
              </InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage>{fieldErrors.email}</FormErrorMessage>
        </FormControl>

        {/* Username Field */}
        <FormControl isInvalid={fieldErrors.username}>
          <FormLabel color="gray.700" fontWeight="semibold">
            Username
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiUser color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Choose a username"
              size="lg"
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.300' }}
              _focus={{ 
                borderColor: 'blue.500',
                shadow: '0 0 0 1px blue.500'
              }}
              disabled={isLoading}
            />
            {username && !fieldErrors.username && (
              <InputRightElement>
                <FiCheck color="green" />
              </InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage>{fieldErrors.username}</FormErrorMessage>
          <FormHelperText fontSize="xs" color="gray.500">
            3-30 characters, letters, numbers, and underscores only
          </FormHelperText>
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
              placeholder="Create a strong password"
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
          
          {/* Password Strength Indicator */}
          {password && (
            <Box mt={2}>
              <Progress 
                value={passwordStrength} 
                size="sm" 
                colorScheme={getPasswordStrengthColor(passwordStrength)}
                borderRadius="md"
              />
              <Text fontSize="xs" color={`${getPasswordStrengthColor(passwordStrength)}.500`} mt={1}>
                Password strength: {getPasswordStrengthText(passwordStrength)}
              </Text>
            </Box>
          )}
          
          <FormHelperText fontSize="xs" color="gray.500">
            At least 8 characters with uppercase, lowercase, number, and special character
          </FormHelperText>
        </FormControl>

        {/* Confirm Password Field */}
        <FormControl isInvalid={fieldErrors.confirmPassword}>
          <FormLabel color="gray.700" fontWeight="semibold">
            Confirm Password
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiLock color="gray.400" />
            </InputLeftElement>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                disabled={isLoading}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{fieldErrors.confirmPassword}</FormErrorMessage>
        </FormControl>

        {/* Sign Up Button */}
        <Button
          type="submit"
          size="lg"
          width="full"
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, purple.600, pink.600)",
            transform: 'translateY(-2px)',
            shadow: 'lg'
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          isLoading={isLoading}
          loadingText="Creating account..."
          spinner={<Spinner size="sm" />}
          disabled={Object.keys(fieldErrors).length > 0}
          transition="all 0.2s"
        >
          Create Account
        </Button>

      </VStack>
    </form>
  )
}

export default SignUpFormContent 