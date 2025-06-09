import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate, useParams } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { fetchCreateReview } from '../../../store/reviews'
import { getAllShoes } from '../../../store/shoes'
import {
  FormControl,
  FormLabel,
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Textarea,
  Text,
  useToast,
  Alert,
  AlertIcon,
  Divider,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { FiStar, FiUser, FiMessageCircle } from 'react-icons/fi'

// Custom Star Rating Component
function StarRating({ rating, onRatingChange, size = 24, isInteractive = true }) {
  const [hoverRating, setHoverRating] = useState(0)
  
  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          as={FiStar}
          boxSize={`${size}px`}
          color={star <= (hoverRating || rating) ? 'yellow.400' : 'gray.300'}
          fill={star <= (hoverRating || rating) ? 'yellow.400' : 'transparent'}
          cursor={isInteractive ? 'pointer' : 'default'}
          transition="all 0.2s"
          _hover={isInteractive ? { transform: 'scale(1.1)' } : {}}
          onClick={isInteractive ? () => onRatingChange(star) : undefined}
          onMouseEnter={isInteractive ? () => setHoverRating(star) : undefined}
          onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
        />
      ))}
    </HStack>
  )
}

function NewReviewChakraForm({ onClose }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const params = useParams()
  const shoeId = params.id
  const userId = useSelector((state) => state.session.user?.id)
  const userName = useSelector((state) => state.session.user?.username)
  
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.800', 'white')
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400')

  const updateComment = (e) => setComment(e.target.value)
  const updateRating = (newRating) => setRating(newRating)

  const validateForm = () => {
    const newErrors = []
    
    if (!comment || comment.trim().length < 5) {
      newErrors.push('Comment must be at least 5 characters long')
    }
    if (comment && comment.length > 250) {
      newErrors.push('Comment must be less than 250 characters')
    }
    if (!rating || rating < 1 || rating > 5) {
      newErrors.push('Please select a rating between 1 and 5 stars')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const data = await dispatch(fetchCreateReview(shoeId, userId, comment.trim(), rating, ''))
      
      if (!data.errors) {
        toast({
          title: 'Review Created!',
          description: 'Your review has been successfully submitted.',
          status: 'success',
          duration: 4000,
          isClosable: true
        })
        await dispatch(getAllShoes())
        onClose()
      } else {
        setErrors(data.errors || ['An error occurred while creating your review'])
      }
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    // Reset form and close
    setComment('')
    setRating(0)
    setErrors([])
    onClose()
  }

  return (
    <Box 
      bg={bgColor} 
      shadow="xl" 
      borderRadius="xl" 
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
    >
      <Box p={8}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={3} align="center">
            <Box
              w={16}
              h={16}
              bg="blue.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiMessageCircle} boxSize={8} color="white" />
            </Box>
            <VStack spacing={1} textAlign="center">
              <Heading size="lg" color={textColor}>
                Write a Review
              </Heading>
              <Text color={subtleTextColor} fontSize="sm">
                Share your experience with this shoe
              </Text>
            </VStack>
          </VStack>

          <Divider borderColor={borderColor} />

          {/* User Info */}
          <HStack spacing={3} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
            <Box
              w={10}
              h={10}
              bg="gray.300"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiUser} boxSize={5} color="gray.600" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold" color={textColor}>
                {userName || 'User'}
              </Text>
              <Text fontSize="sm" color={subtleTextColor}>
                Verified Reviewer
              </Text>
            </VStack>
          </HStack>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert status="error" borderRadius="lg">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                {errors.map((error, index) => (
                  <Text key={index} fontSize="sm">
                    {error}
                  </Text>
                ))}
              </VStack>
            </Alert>
          )}

          {/* Rating Section */}
          <FormControl>
            <FormLabel color={textColor} fontWeight="semibold" fontSize="md">
              Your Rating
            </FormLabel>
            <VStack align="start" spacing={3}>
              <StarRating rating={rating} onRatingChange={updateRating} size={32} />
              <Text fontSize="sm" color={subtleTextColor}>
                {rating === 0 && 'Click to rate this shoe'}
                {rating === 1 && 'Poor - Not satisfied'}
                {rating === 2 && 'Fair - Below expectations'}
                {rating === 3 && 'Good - Meets expectations'}
                {rating === 4 && 'Very Good - Exceeds expectations'}
                {rating === 5 && 'Excellent - Outstanding quality'}
              </Text>
            </VStack>
          </FormControl>

          {/* Comment Section */}
          <FormControl>
            <FormLabel color={textColor} fontWeight="semibold" fontSize="md">
              Your Review
            </FormLabel>
            <Textarea
              value={comment}
              onChange={updateComment}
              placeholder="Share your detailed experience with this shoe... (minimum 5 characters)"
              resize="vertical"
              minH="120px"
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.300' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182CE' }}
              bg={useColorModeValue('white', 'gray.700')}
            />
            <HStack justify="space-between" mt={2}>
              <Text fontSize="xs" color={subtleTextColor}>
                Minimum 5 characters required
              </Text>
              <Text
                fontSize="xs"
                color={comment.length > 250 ? 'red.500' : subtleTextColor}
              >
                {comment.length}/250
              </Text>
            </HStack>
          </FormControl>

          {/* Action Buttons */}
          <HStack spacing={4} pt={4}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={onSubmit}
              isLoading={isSubmitting}
              loadingText="Submitting..."
              isDisabled={!comment.trim() || !rating}
              flex={1}
              borderRadius="lg"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Submit Review
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
              isDisabled={isSubmitting}
              borderRadius="lg"
              _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default NewReviewChakraForm
