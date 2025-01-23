import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  VStack,
  Center,
  Box
} from '@chakra-ui/react'
import SignUpForm from '../SignupFormPage/SignupForm'

function LoginForm () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleCredentials = (e) => setCredential(e.target.value)
  // const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(sessionActions.login({ credential, password }))
    if (data?.errors) {
      setErrors(data.errors)
      return
    }
    navigate('/home')
    return data
  }

  return (
    <>
      <Button
        onClick={onOpen}
        color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.9em' padding='0.7em 4em'
        _hover={{ color: 'rgba(0,0,0,0.8)', background_color: '#fff', box_shadow: 'inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)' }}
      >
        Log In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
        <ModalContent>
          <ModalHeader
            bg='black'
            color='white'
          >
            <Center fontSize='30px'>
              SNKR MRKT
            </Center>
          </ModalHeader>
          <ModalCloseButton mt='3px' backgroundColor='white' _hover={{ bg: 'white' }} />
          <ModalBody>
            <Center pb='20px'>
              <Box borderBottom='4px' borderColor='gray.300' width='35%' _hover={{ borderColor: 'black' }}>
                <Center fontSize='md' pb='13px' fontWeight='bold'>
                  Log In
                </Center>
              </Box>
              <SignUpForm />
            </Center>
            <FormControl onSubmit={handleSubmit}>
              <VStack
                spacing={8} w='70%'
                pos='relative'
                left='15%'
              >
                <Box color='red.400' fontSize='lg' fontWeight='bold'>
                  {errors.map((error, idx) => <Text key={idx}>{error}</Text>)}
                </Box>
                <Input
                  placeholder='Email'
                  type='text'
                  id='email'
                  value={credential}
                  onChange={handleCredentials}
                  required
                  size='lg'
                />
                <Input
                  placeholder='Password'
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  size='lg'
                />
                <Button
                  type='submit'
                  onClick={handleSubmit}
                  bg='black'
                  color='white'
                >
                  Log In
                </Button>
              </VStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bg='black' color='white' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginForm
