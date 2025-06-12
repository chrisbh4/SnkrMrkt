import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Image
  , useDisclosure
} from '@chakra-ui/react'

import EditReviewChakraForm from '.'

function EditReviewModal ({ review }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        onClick={onOpen}
        color='rgba(255,255,255,1)' background='black' border-radius='square' letterSpacing='0.35em' fontSize='0.7em' padding='0.9em 2em'
        w='auto%'
        _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
      >
        Edit Review
      </Button>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='6xl' px='0'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody w='full'>
            <EditReviewChakraForm onClose={onClose} review={review} />
          </ModalBody>

          <Image
            src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/New-Shoe-background-img.jpeg'
            w='full'
            h='300px'
            fit='cover'
          />
          {/* <ModalFooter>

                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditReviewModal
