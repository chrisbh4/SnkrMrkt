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
  Icon
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import EditShoesFormChakra from '.'

function EditShoeModalForm ({ shoe }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="gray"
        variant="outline"
        size="md"
        leftIcon={<Icon as={FiEdit} />}
        borderRadius="lg"
        fontWeight="semibold"
        _hover={{ 
          transform: 'translateY(-1px)', 
          shadow: 'md' 
        }}
        transition="all 0.2s"
      >
        Edit Shoe
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
            Edit Shoe Listing
          </ModalHeader>
          <ModalCloseButton 
            size="lg" 
            color="gray.500"
            _hover={{ color: 'gray.700', bg: 'gray.100' }}
          />
          <ModalBody p={0} bg={useColorModeValue('white', 'gray.900')}>
            <EditShoesFormChakra onClose={onClose} shoe={shoe} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditShoeModalForm
