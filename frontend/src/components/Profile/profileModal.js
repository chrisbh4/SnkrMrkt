import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    Select,
    Box,
    Text,
} from '@chakra-ui/react'



function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastName] = useState('')
    const [shoeSize, setShoeSize] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(sessionActions.update({ email, username, password, firstName, lastName, shoeSize }))

        if (data?.errors) {
            if (password !== confirmPassword) {
                const err = [...data?.errors, 'Password and Confirm Password must match']
                setErrors(err)
            } else {
                setErrors(data?.errors)
            }
        }
        //* */ Might need to do a data refresh after updating the user profile
        onClose()
        return data
    }

    return (
        <>
            <Button onClick={onOpen} bg='black' textColor={'white'}>Update Profile</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}  >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel fontWeight={'bold'} my={'3'}>Email</FormLabel>
                            <Input type='email' value={sessionUser?.email} placeholder='Email' _placeholder={{ color: 'black' }} onChange={(e) => setEmail(e.target.value)} />
                            <FormLabel fontWeight={'bold'} my={'3'}>Username</FormLabel>
                            <Input type='text' value={sessionUser?.text} placeholder='Username' _placeholder={{ color: 'black' }} onChange={(e) => setUsername(e.target.value)} />
                            <FormLabel fontWeight={'bold'} my={'3'}>First Name</FormLabel>
                            <Input type='text' value={sessionUser?.firstName} placeholder='First Name' _placeholder={{ color: 'black' }} onChange={(e) => setFirstname(e.target.value)} />
                            <FormLabel fontWeight={'bold'} my={'3'}>Last Name</FormLabel>
                            <Input  type='text' value={sessionUser?.lastName} placeholder='Last Name' _placeholder={{ color: 'black' }} onChange={(e) => setLastName(e.target.value)} />
                            {/* Keep styling basic until I figure out what I want to do about Changing password */}
                            <FormLabel fontWeight={'bold'} my={'3'}>Password</FormLabel>
                            <Input my={'3'} type='password' placeholder='New Password' _placeholder={{ color: 'black' }} onChange={(e) => setPassword(e.target.value)} />
                            <Input my={'3'} type='password' placeholder='Confirm Password' _placeholder={{ color: 'black' }} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <FormHelperText ml={'1.5'}>At least 8 characters, 1 uppercase letter, 1 number & 1 symbol.</FormHelperText>
                            <FormLabel mt={'8'}>Shoe Size</FormLabel>
                            <Select my={'3'} onChange={(e) => setShoeSize(e.target.value)} value={shoeSize || sessionUser?.shoeSize}>
                                {[...Array(25)].map((_, i) => {
                                    const size = (i / 2) + 3;
                                    return <option key={size} value={size}>{size}</option>;
                                })}
                            </Select>
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


export default BasicUsage
