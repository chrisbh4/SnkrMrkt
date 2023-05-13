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
    Image
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import EditShoesFormChakra from '.'




function EditShoeModalForm({shoe}) {
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
                Edit Shoe
            </Button>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={'6xl'} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Edit Shoe Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w={"full"}>
                        <EditShoesFormChakra onClose={onClose} shoe={shoe} />
                    </ModalBody>

                    <ModalFooter></ModalFooter>

                    <Image
                    src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/New-Shoe-background-img.jpeg"
                    w={"full"}
                    h="300px"
                    fit="cover"
                />
                </ModalContent>
            </Modal>
        </>
    )
}


export default EditShoeModalForm;
