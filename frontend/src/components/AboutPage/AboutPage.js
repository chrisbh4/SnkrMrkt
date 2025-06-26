import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { 
  Text, 
  Box, 
  Image, 
  Heading, 
  Container,
  VStack,
  HStack,
  Button,
  Badge,
  useColorModeValue,
  Icon,
  Avatar,
  SimpleGrid,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { 
  FiStar, 
  FiShield, 
  FiTrendingUp, 
  FiUsers, 
  FiAward,
  FiHeart,
  FiShoppingBag,
  FiGlobe,
  FiCheckCircle,
  FiTarget,
  FiZap
} from 'react-icons/fi'

// Create motion components
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

function AboutPage() {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    setIsVisible(true)
  }, [dispatch])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const features = [
    {
      icon: FiShield,
      title: "Authenticity Guaranteed",
      description: "Every pair verified by our expert team. 100% authentic sneakers, always.",
      color: "blue.500"
    },
    {
      icon: FiStar,
      title: "Exclusive Drops",
      description: "First access to limited editions and rare finds from top brands worldwide.",
      color: "purple.500"
    },
    {
      icon: FiUsers,
      title: "Community Driven",
      description: "Join thousands of sneakerheads sharing passion, trends, and discoveries.",
      color: "green.500"
    },
    {
      icon: FiTrendingUp,
      title: "Market Insights",
      description: "Real-time pricing and market trends to make informed buying decisions.",
      color: "orange.500"
    },
    {
      icon: FiHeart,
      title: "Curated Collection",
      description: "Handpicked selection of vintage classics and modern masterpieces.",
      color: "red.500"
    },
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Quick delivery and seamless shopping experience from browse to doorstep.",
      color: "yellow.500"
    }
  ]

  const stats = [
    { label: "Happy Customers", value: "50K+", icon: FiUsers },
    { label: "Verified Sneakers", value: "100K+", icon: FiShield },
    { label: "Global Brands", value: "200+", icon: FiGlobe },
    { label: "Countries Served", value: "45+", icon: FiTarget }
  ]

  const team = [
    {
      name: "Christian Brown",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "Passionate sneakerhead with 15+ years in the industry"
    },
    {
      name: "Sarah Johnson",
      role: "Head of Authentication",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9de8678?w=150&h=150&fit=crop&crop=face",
      description: "Expert authenticator ensuring every pair meets our standards"
    },
    {
      name: "Marcus Chen",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Building bridges between collectors and enthusiasts worldwide"
    }
  ]

  return (
    <Box bg={bgColor} w="100%" pt="60px">
      {/* Hero Section */}
      <Box position="relative" overflow="hidden" bg="gray.900" py={{ base: 20, md: 32 }}>
        {/* Background Pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(135deg, blue.600 0%, purple.600 50%, pink.500 100%)"
          opacity="0.1"
        />
        
        {/* Floating Elements */}
        <Box
          position="absolute"
          top="10%"
          right="10%"
          w="300px"
          h="300px"
          bgGradient="radial(circle, blue.400, transparent 70%)"
          opacity="0.3"
          borderRadius="full"
          filter="blur(40px)"
        />
        <Box
          position="absolute"
          bottom="10%"
          left="10%"
          w="200px"
          h="200px"
          bgGradient="radial(circle, purple.400, transparent 70%)"
          opacity="0.3"
          borderRadius="full"
          filter="blur(30px)"
        />

        <Container maxW="7xl" position="relative" zIndex="2">
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            textAlign="center"
          >
            <Badge colorScheme="blue" size="lg" mb={4}>
              Premium Sneaker Marketplace
            </Badge>
            
            <Heading
              as="h1"
              size="4xl"
              fontWeight="bold"
              color="white"
              mb={6}
              lineHeight="shorter"
            >
              Welcome to{" "}
              <Text as="span" bgGradient="linear(to-r, blue.400, purple.400)" bgClip="text">
                SNKR MRKT
              </Text>
            </Heading>
            
            <Text
              fontSize="xl"
              color="gray.300"
              maxW="3xl"
              mx="auto"
              mb={8}
              lineHeight="tall"
            >
              The ultimate destination for sneaker enthusiasts, collectors, and anyone who 
              appreciates the artistry and craftsmanship of premium footwear. Discover rare finds, 
              exclusive drops, and authentic pieces that define style and status.
            </Text>

            <HStack justify="center" spacing={4} flexWrap="wrap">
              <Button
                size="lg"
                bgGradient="linear(to-r, blue.500, purple.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, purple.700)",
                  transform: "translateY(-2px)",
                  shadow: "xl"
                }}
                leftIcon={<FiShoppingBag />}
                px={8}
              >
                Shop Collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "translateY(-2px)"
                }}
                leftIcon={<FiUsers />}
                px={8}
              >
                Join Community
              </Button>
            </HStack>
          </MotionBox>
        </Container>

        {/* Brand Logos */}
        <Container maxW="6xl" mt={16}>
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={stagger}
          >
            <Text color="gray.400" textAlign="center" mb={8} fontSize="sm" textTransform="uppercase" letterSpacing="wide">
              Trusted by Leading Brands
            </Text>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={8} alignItems="center">
              <MotionBox variants={fadeInUp} textAlign="center">
                <Image src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/002_nike-logos-swoosh-white.png" alt="Nike" h={12} mx="auto" />
              </MotionBox>
              <MotionBox variants={fadeInUp} textAlign="center">
                <Text color="white" fontSize="2xl" fontWeight="bold">YEEZY</Text>
              </MotionBox>
              <MotionBox variants={fadeInUp} textAlign="center">
                <Image src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/006_nike-logos-jordan-white.png" alt="Jordan" h={16} mx="auto" />
              </MotionBox>
              <MotionBox variants={fadeInUp} textAlign="center">
                <Image src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/004_nike-logos-converse-white.png" alt="Converse" h={14} mx="auto" />
              </MotionBox>
              <MotionBox variants={fadeInUp} textAlign="center">
                <Image src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/adidas-logo-png-adidas-icon-transparent-png_19766239.png" alt="Adidas" h={16} mx="auto" />
              </MotionBox>
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="7xl">
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={stagger}
            textAlign="center"
            mb={16}
          >
            <MotionBox variants={fadeInUp}>
              <Heading size="xl" color={textColor} mb={4}>
                Trusted by Sneakerheads Worldwide
              </Heading>
              <Text fontSize="lg" color={mutedColor} maxW="2xl" mx="auto">
                Our numbers speak for themselves. Join thousands of satisfied customers who trust us for their sneaker needs.
              </Text>
            </MotionBox>
          </MotionBox>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <MotionBox
                key={stat.label}
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <Box 
                  bg={cardBg} 
                  borderWidth="1px" 
                  borderColor={borderColor} 
                  shadow="lg" 
                  borderRadius="xl"
                  h="full"
                  p={8}
                  textAlign="center"
                  _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
                  transition="all 0.3s"
                >
                  <Icon as={stat.icon} boxSize={8} color="blue.500" mb={4} />
                  <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
                    {stat.value}
                  </Text>
                  <Text color={mutedColor} fontWeight="medium">
                    {stat.label}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="7xl">
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            textAlign="center"
            mb={16}
          >
            <Badge colorScheme="purple" mb={4}>Why Choose Us</Badge>
            <Heading size="xl" color={textColor} mb={4}>
              What Makes Us Different
            </Heading>
            <Text fontSize="lg" color={mutedColor} maxW="3xl" mx="auto">
              We've built more than just a marketplace – we've created an ecosystem for sneaker culture, 
              combining authenticity, community, and cutting-edge technology.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <MotionBox
                key={feature.title}
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <Box 
                  bg={cardBg} 
                  borderWidth="1px" 
                  borderColor={borderColor} 
                  shadow="md"
                  borderRadius="xl"
                  p={8}
                  h="full"
                  _hover={{ 
                    shadow: "xl", 
                    transform: "translateY(-4px)",
                    borderColor: feature.color
                  }}
                  transition="all 0.3s"
                >
                  <VStack align="start" spacing={4}>
                    <Icon as={feature.icon} boxSize={10} color={feature.color} />
                    <Heading size="md" color={textColor}>
                      {feature.title}
                    </Heading>
                    <Text color={mutedColor} lineHeight="tall">
                      {feature.description}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Video Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="6xl">
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            textAlign="center"
            mb={12}
          >
            <Heading size="xl" color={textColor} mb={4}>
              Experience the Culture
            </Heading>
            <Text fontSize="lg" color={mutedColor} maxW="2xl" mx="auto">
              Dive into the world of sneaker culture and discover what makes each pair special.
            </Text>
          </MotionBox>
          
          <Box 
            borderRadius="2xl" 
            overflow="hidden" 
            shadow="2xl"
            position="relative"
            aspectRatio="16/9"
          >
            <video 
              width="100%" 
              height="100%" 
              autoPlay 
              muted 
              loop
              style={{ objectFit: 'cover' }}
            >
              <source src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/landing-page-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Container>
      </Box>

      {/* Team Section */}
      <Box py={20}>
        <Container maxW="7xl">
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            textAlign="center"
            mb={16}
          >
            <Badge colorScheme="green" mb={4}>Our Team</Badge>
            <Heading size="xl" color={textColor} mb={4}>
              Meet the Sneaker Experts
            </Heading>
            <Text fontSize="lg" color={mutedColor} maxW="3xl" mx="auto">
              Our passionate team combines deep industry knowledge with genuine love for sneaker culture.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {team.map((member, index) => (
              <MotionBox
                key={member.name}
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <Box 
                  bg={cardBg} 
                  borderWidth="1px" 
                  borderColor={borderColor} 
                  shadow="lg"
                  borderRadius="xl"
                  p={8}
                  textAlign="center"
                  _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
                  transition="all 0.3s"
                >
                  <Avatar size="2xl" src={member.image} name={member.name} mb={6} />
                  <Heading size="md" color={textColor} mb={2}>
                    {member.name}
                  </Heading>
                  <Text color="blue.500" fontWeight="semibold" mb={4}>
                    {member.role}
                  </Text>
                  <Text color={mutedColor} fontSize="sm">
                    {member.description}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="gray.900" position="relative" overflow="hidden">
        {/* Background Effects */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(135deg, blue.600 0%, purple.600 100%)"
          opacity="0.1"
        />
        
        <Container maxW="4xl" position="relative" zIndex="2">
          <MotionBox
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            textAlign="center"
          >
            <Heading size="2xl" color="white" mb={6}>
              Ready to Elevate Your Collection?
            </Heading>
            <Text fontSize="xl" color="gray.300" mb={8} maxW="2xl" mx="auto">
              Join thousands of sneakerheads who trust SNKR MRKT for authentic, rare, and exclusive footwear.
            </Text>
            
            <HStack justify="center" spacing={6} flexWrap="wrap">
              <Button
                size="lg"
                bgGradient="linear(to-r, blue.500, purple.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, purple.700)",
                  transform: "translateY(-2px)",
                  shadow: "xl"
                }}
                leftIcon={<FiShoppingBag />}
                px={10}
                py={6}
                fontSize="lg"
              >
                Start Shopping
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "translateY(-2px)"
                }}
                leftIcon={<FiHeart />}
                px={10}
                py={6}
                fontSize="lg"
              >
                Join Waitlist
              </Button>
            </HStack>

            {/* Trust Indicators */}
            <HStack justify="center" spacing={8} mt={12} flexWrap="wrap">
              <HStack spacing={2}>
                <Icon as={FiCheckCircle} color="green.400" />
                <Text color="gray.400" fontSize="sm">100% Authentic</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiShield} color="blue.400" />
                <Text color="gray.400" fontSize="sm">Secure Payments</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiAward} color="purple.400" />
                <Text color="gray.400" fontSize="sm">Expert Verified</Text>
              </HStack>
            </HStack>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  )
}

export default AboutPage
