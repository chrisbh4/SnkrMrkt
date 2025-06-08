import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Box,
    Text,
} from '@chakra-ui/react'


function ChangePasswordForm({user}){
    const { isOpen, onOpen, onClose } = useDisclosure()
        const dispatch = useDispatch()
        const id = user?.id
        const [password, setPassword] = useState(null)
        const [confirmPassword, setConfirmPassword] = useState(null)
        const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
            e.preventDefault()
            if (password !== confirmPassword){
                const matchError = ["Password and Confirm Password must match"]
                setErrors(matchError)
                return {}
            } else{
                const data = await dispatch(sessionActions.changePassword({ id, password }))
                if (data?.errors){
                    setErrors(data?.errors)
                    return data
                }
                setErrors([])
                await dispatch(sessionActions.restoreUser())
                onClose()
                return data
            }
        }

    return(
        <>
         <Button 
           onClick={onOpen} 
           colorScheme="red" 
           variant="solid"
           size="md"
           borderRadius="lg"
           fontWeight="medium"
           w="full"
         >
           Change Password
         </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>                                    
                            <FormLabel fontWeight={'bold'} my={'3'}>Password</FormLabel>
                            <Input id='password' my={'3'} type='password' placeholder='New Password' _placeholder={{ color: 'black' }} onChange={(e) => setPassword(e.target.value)} />
                            <Input id='confirmPassword' my={'3'} type='password' placeholder='Confirm Password' _placeholder={{ color: 'black' }} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <FormHelperText ml={'1.5'}>At least 8 characters, 1 uppercase letter, 1 number & 1 symbol.</FormHelperText>
                        </FormControl>
                        <Box color='red.400' fontSize='lg' fontWeight='bold'>
                            {errors.map((error, idx) => <Text key={idx}>{error}</Text>)}
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type='submit' onClick={handleSubmit} bg={'black'} textColor={'white'}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}



export default ChangePasswordForm