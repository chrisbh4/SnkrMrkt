import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShoeReviews } from '../../../store/reviews'
import NewReviewModal from '../NewReview/ModalForm'
import EditReviewModal from '../EditReview/ModalForm'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  Divider,
  Avatar,
  Badge,
  useColorModeValue,
  Icon,
  Flex,
  Spacer
} from '@chakra-ui/react'
import { FiStar, FiUser, FiMessageCircle } from 'react-icons/fi'

// Star Rating Display Component
function StarDisplay({ rating, size = 16 }) {
  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          as={FiStar}
          boxSize={`${size}px`}
          color={star <= rating ? 'yellow.400' : 'gray.300'}
          fill={star <= rating ? 'yellow.400' : 'transparent'}
        />
      ))}
    </HStack>
  )
}

// Individual Review Component
function ReviewItem({ review, currentUserId, currentUser }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.800', 'white')
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400')
  
  const isOwner = currentUserId === review.userId
  
  // Smart username resolution: prefer review.User.username, fallback to current user if it's their review
  const username = review.User?.username || 
                  (isOwner && currentUser?.username) || 
                  'Anonymous User'

  return (
    <Box
      p={4}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      bg={bgColor}
      shadow="sm"
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between" align="start">
          <HStack spacing={3}>
            <Avatar size="sm" name={username} bg="blue.500" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold" color={textColor}>
                {username}
              </Text>
              <HStack spacing={2}>
                <StarDisplay rating={review.rating} />
                <Text fontSize="sm" color={subtleTextColor}>
                  {review.rating}/5
                </Text>
              </HStack>
            </VStack>
          </HStack>
          {isOwner && (
            <EditReviewModal review={review} />
          )}
        </HStack>
        
        <Text color={textColor} lineHeight="tall">
          {review.comment}
        </Text>
        
        <Text fontSize="xs" color={subtleTextColor}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  )
}

// Main Universal Reviews Component
function UniversalReviews({ shoeIdentifier, shoeType = 'local', shoeName }) {
  const dispatch = useDispatch()
  const reviews = useSelector((state) => state.reviews)
  const currentUserId = useSelector((state) => state.session.user?.id)
  const currentUser = useSelector((state) => state.session.user)
  const isLoggedIn = !!currentUserId
  
  const [isLoading, setIsLoading] = useState(true)
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400')
  const loginPromptBgColor = useColorModeValue('blue.50', 'blue.900')
  const loginPromptTextColor = useColorModeValue('blue.700', 'blue.200')
  
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true)
      try {
        await dispatch(fetchShoeReviews(shoeIdentifier, shoeType))
      } catch (error) {
        console.error('Error loading reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    if (shoeIdentifier) {
      loadReviews()
    }
  }, [dispatch, shoeIdentifier, shoeType])
  
  // Convert reviews object to array and filter for this shoe
  const shoeReviews = Object.values(reviews || {}).filter(review => {
    if (shoeType === 'stockx') {
      return review.styleID === shoeIdentifier
    } else {
      return review.shoeId === parseInt(shoeIdentifier)
    }
  })
  
  // Calculate average rating
  const averageRating = shoeReviews.length > 0 
    ? shoeReviews.reduce((sum, review) => sum + review.rating, 0) / shoeReviews.length 
    : 0

  if (isLoading) {
    return (
      <Box p={6} bg={bgColor} borderRadius="lg">
        <Text color={textColor}>Loading reviews...</Text>
      </Box>
    )
  }

  return (
    <Box p={6} bg={bgColor} borderRadius="lg">
      <VStack align="stretch" spacing={6}>
        {/* Reviews Header */}
        <Flex align="center" justify="space-between">
          <VStack align="start" spacing={1}>
            <HStack spacing={3}>
              <Icon as={FiMessageCircle} boxSize={6} color={shoeType === 'stockx' ? 'purple.500' : 'blue.500'} />
              <Heading size="lg" color={textColor}>
                Reviews
              </Heading>
              {shoeType === 'stockx' && (
                <Badge colorScheme="purple" variant="subtle">
                  StockX
                </Badge>
              )}
            </HStack>
            
            {shoeReviews.length > 0 && (
              <HStack spacing={2}>
                <StarDisplay rating={Math.round(averageRating)} size={20} />
                <Text fontWeight="semibold" color={textColor}>
                  {averageRating.toFixed(1)}
                </Text>
                <Text color={subtleTextColor}>
                  ({shoeReviews.length} {shoeReviews.length === 1 ? 'review' : 'reviews'})
                </Text>
              </HStack>
            )}
          </VStack>
          
          {isLoggedIn && (
            <NewReviewModal shoeIdentifier={shoeIdentifier} shoeType={shoeType} />
          )}
        </Flex>

        <Divider />

        {/* Reviews List */}
        {shoeReviews.length === 0 ? (
          <VStack spacing={4} py={8} textAlign="center">
            <Icon as={FiUser} boxSize={12} color="gray.300" />
            <VStack spacing={2}>
              <Text fontWeight="semibold" color={textColor}>
                No reviews yet
              </Text>
              <Text color={subtleTextColor} fontSize="sm">
                Be the first to review this shoe!
              </Text>
            </VStack>
            {isLoggedIn && (
              <NewReviewModal shoeIdentifier={shoeIdentifier} shoeType={shoeType} />
            )}
          </VStack>
        ) : (
          <VStack spacing={4} align="stretch">
            {shoeReviews
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
              .map((review) => (
                <ReviewItem 
                  key={review.id} 
                  review={review} 
                  currentUserId={currentUserId}
                  currentUser={currentUser}
                />
              ))}
          </VStack>
        )}

        {!isLoggedIn && (
          <Box 
            p={4} 
            bg={loginPromptBgColor} 
            borderRadius="lg" 
            textAlign="center"
          >
            <Text color={loginPromptTextColor}>
              Please log in to write a review
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default UniversalReviews 