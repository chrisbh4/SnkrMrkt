import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  VStack,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue
} from '@chakra-ui/react'
import { FiUser } from 'react-icons/fi'
import SignUpFormContent from './SignupFormContent'
import LoginFormContent from '../LoginFormPage/LoginFormContent'

function NavBtnSignUpForm () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800')
  const tabSelectedColor = useColorModeValue('purple.500', 'purple.200')

  if (sessionUser) return navigate('/')

  const handleModalClose = () => {
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
        _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
      >
        Sign Up
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={handleModalClose} 
        size="lg"
        closeOnOverlayClick={true}
        closeOnEsc={true}
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
            bgGradient="linear(to-r, purple.500, pink.500)"
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
                  Join the sneaker marketplace
                </Text>
              </VStack>
            </Center>
          </ModalHeader>
          
          <ModalCloseButton 
            color="white" 
            size="lg"
            _hover={{ bg: 'whiteAlpha.200' }}
          />

          <ModalBody p={0}>
            <Tabs variant="soft-rounded" colorScheme="purple" p={6} defaultIndex={1}>
              <TabList mb={6} bg="gray.50" p={1} borderRadius="lg">
                <Tab 
                  flex={1}
                  _selected={{ 
                    color: 'white', 
                    bg: 'blue.500',
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
                  <LoginFormContent onClose={handleModalClose} />
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

export default NavBtnSignUpForm
