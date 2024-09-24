import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
    Select
} from '@chakra-ui/react'



function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        const data = await dispatch(sessionActions.signup({ email, username, password, firstName, lastName, shoeSize }))

        if (data?.errors) {
          if (password !== confirmPassword) {
            const err = [...data?.errors, 'Password and Confirm Password must match']
            setErrors(err)
          } else {
            setErrors(data?.errors)
          }
        }
        navigate('/')
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
                            <Input my={'3'} type='email' placeholder='Email' _placeholder={{ color: 'black' }} onChange={(e) => setEmail(e.target.value)} />
                            <Input my={'3'} type='text' placeholder='Username' _placeholder={{ color: 'black' }} onChange={(e) => setUsername(e.target.value)} />
                            <Input my={'3'} type='text' placeholder='First Name' _placeholder={{ color: 'black' }} onChange={(e) => setFirstname(e.target.value)} />
                            <Input my={'3'} type='text' placeholder='Last Name' _placeholder={{ color: 'black' }} onChange={(e) => setLastName(e.target.value)} />
                            <Input my={'3'} type='password' placeholder='Password' _placeholder={{ color: 'black' }} onChange={(e) => setPassword(e.target.value)} />
                            <Input my={'3'} type='password' placeholder='Confirm Password' _placeholder={{ color: 'black' }} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <FormHelperText ml={'1.5'}>At least 8 characters, 1 uppercase letter, 1 number & 1 symbol.</FormHelperText>
                            <FormLabel mt={'8'}>Shoe Size</FormLabel>
                            <Select my={'3'} onChange={(e) => setShoeSize(e.target.value)} value={shoeSize}>
                                {[...Array(25)].map((_, i) => {
                                    const size = (i / 2) + 3;
                                    return <option key={size} value={size}>{size}</option>;
                                })}
                            </Select>
                        </FormControl>
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
