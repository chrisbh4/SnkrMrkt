import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import NewShoesForm from '.'

function NewShoeModalForm () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        onClick={onOpen}
        color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.9em 4em'
        _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
      >
        Sell 
      </Button>

      <Modal 
        finalFocusRef={finalRef} 
        isOpen={isOpen} 
        onClose={onClose} 
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent
          borderRadius="2xl"
          mx={4}
          my={8}
          shadow="2xl"
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            color="gray.800"
            borderBottom="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            bg={useColorModeValue('gray.50', 'gray.800')}
            borderTopRadius="2xl"
          >
            List Your Sneakers
          </ModalHeader>
          <ModalCloseButton 
            size="lg" 
            color="gray.500"
            _hover={{ color: 'gray.700', bg: 'gray.100' }}
          />
          <ModalBody p={0} bg={useColorModeValue('white', 'gray.900')}>
            <NewShoesForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewShoeModalForm
