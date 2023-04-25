import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import NewReviewChakraForm from '.'




function CreateReviewModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)



    return (
        <>
            <Button
                onClick={onOpen}
                // color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.7em' padding='0.9em 4em'
                color='rgba(255,255,255,1)' background='black' border-radius='square' letterSpacing='0.35em' fontSize='0.7em' padding='0.9em 4em'
                _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
            >
                Create Review
            </Button>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={'6xl'} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Edit Shoe Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={"full"}>
                        <NewReviewChakraForm onClose={onClose}  />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default CreateReviewModal;
