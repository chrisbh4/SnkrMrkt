import React, { useState, useEffect } from 'react'
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
    Input,
    Select,
    Box,
    Text,
} from '@chakra-ui/react'

//TODO: [] User model updated to include: Phone Number, Address
function ProfileUpdateForm({user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const id = user?.id
    const [email, setEmail] = useState(user?.email)
    const [username, setUsername] = useState(user?.username)
    const [firstName, setFirstname] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [shoeSize, setShoeSize] = useState(user?.shoeSize)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(sessionActions.update({ id, email, username, firstName, lastName, shoeSize }))
        if (data?.errors) {
                setErrors(data?.errors)
                return data
            } else {
                setErrors([])
            }
        await dispatch(sessionActions.restoreUser())
        onClose()
        return data
    }

    useEffect(() => {
        if (user) {
          setUsername(user.username)
          setFirstname(user.firstName)
          setLastName(user.lastName)
          setEmail(user.email)
          setShoeSize(user.shoeSize)
        }
      }, [user]);

    return (
        <>
            <Button onClick={onOpen} bg='black' textColor={'white'}>Update Profile</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel fontWeight={'bold'} my={'3'}>Email</FormLabel>
                            <Input id='email' type='email' value={email} placeholder={email}  _placeholder={{ color: 'black' }} onChange={(e) => setEmail(e.target.value)} />
                            <FormLabel fontWeight={'bold'} my={'3'}>Username</FormLabel>
                            <Input id='username' type='text' value={username} placeholder={username} _placeholder={{ color: 'black' }} onChange={(e) => setUsername(e.target.value)} />
                            <FormLabel fontWeight={'bold'} my={'3'}>First Name</FormLabel>
                            <Input id='firstName' type='text' value={firstName} placeholder={firstName} _placeholder={{ color: 'black' }} onChange={(e) => setFirstname(e.target.value)} />
                            <FormLabel fontWeight={'bold'} my={'3'}>Last Name</FormLabel>
                            <Input id='lastName' type='text' value={lastName} placeholder={lastName} _placeholder={{ color: 'black' }} onChange={(e) => setLastName(e.target.value)} />
                            <FormLabel mt={'8'}>Shoe Size</FormLabel>
                            <Select my={'3'} onChange={(e) => setShoeSize(e.target.value)} value={shoeSize || user?.shoeSize}>
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


export default ProfileUpdateForm
