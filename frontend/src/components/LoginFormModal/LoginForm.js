import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'
import { Center, Box, VStack, Button, Text, Input, FormControl } from '@chakra-ui/react'
import './LoginForm.css'

function LoginForm () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleCredentials = (e) => setCredential(e.target.value)
  // const handlePassword = (e) => {
  //   return setPassword(e.target.value)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(sessionActions.login({ credential, password }))

    if (data?.errors) {
      setErrors(data.errors)
      return
    }
    navigate('/all-shoes')
    return data
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password })).catch(
  //     async (res) => {

  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     }
  //   );
  // };

  return (

    <Box>
      <Center pb='20px' pt='15px' bg='gray.900'>
        <Text color='white' fontSize='30px' position='relative' top='7px'>SNKR MRKT</Text>
      </Center>

      <Box pb='100px' px='50px' bg='gray.100'>
        <Box py='70px' px='0px' border='2px' borderColor='gray.300' bg='white'>

          <Center pb='20px'>
            <Box borderBottom='4px' borderColor='gray.300' width='35%' _hover={{ borderColor: 'black' }}>
              <Center fontSize='md' pb='13px' fontWeight='bold'>Log In </Center>
            </Box>
            <Box borderBottom='4px' borderColor='gray.300' width='35%' _hover={{ borderColor: 'black' }}>
              <Center fontSize='md' pb='13px' fontWeight='bold'>Sign Up </Center>
            </Box>
          </Center>

          <VStack>
            <FormControl onSubmit={handleSubmit} w='full' px='20px'>
              {/* Error Handler */}
              <VStack pb='15px' color='red.500'>
                {errors.map((error, idx) => {
                  return <Text key={idx}>{error}</Text>
                }
                )}
              </VStack>

              <Input
                placeholder='Enter Email'
                type='text'
                id='email'
                value={credential}
                onChange={handleCredentials}
                required
                borderBottom='2px'
                borderColor='black'
                width='90%'
                mb='10px'
                position='relative'
                left='20px'
              />

              <Input
                placeholder='Enter Password'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                borderBottom='2px'
                borderColor='black'
                width='90%'
                position='relative'
                left='20px'
              />
              <Center pt='10px' pb='20px'>
                <Button onClick={handleSubmit} width='60%' type='submit' color='white' bg='gray.900'>Log In</Button>
              </Center>

            </FormControl>
          </VStack>
          <footer>
            <p>Christian Brown</p>
            <div class='networking'>
              <a href='https://www.linkedin.com/in/christian-brown-8770311ba/'>
                <i class='fab fa-linkedin' />
              </a>
              <a href='mailto:Chrismbh4@gmail.com'>
                <i class='fas fa-envelope-square' />
              </a>

              <a href='https://github.com/chrisbh4'>
                <i class='fab fa-github' />
              </a>
            </div>
          </footer>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm
