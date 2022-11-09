import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button, Text, Flex, SimpleGrid, Link, Input, Stack, Form, FormControl, FormLabel, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCredentials = (e) => setCredential(e.target.value)
  const handlePassword = (e) => {
    console.log(e.target.value)
    return setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside Handle Submit")

    const data = await dispatch(sessionActions.login({ credential, password }))

    console.log(data)

    if (data?.errors) {
      setErrors(data.errors)
      return
    }
    navigate('/home')
    return data
  };


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
      <Center pb='20px' pt='15px' bg='gray.200'>
        <Text fontSize={'3xl'} position='relative' top='7px'>SNKR MRT</Text>
        </Center>

      <Box pb='100px' px={'50px'} bg='gray.200'  >
        <Box py='70px' px='0px' border={'2px'} bg='white'>


          <Center pb='20px'>
            <Box borderBottom='4px' borderColor='gray.400' width={'35%'} _hover={{ borderColor: 'black' }}>
              <Center fontSize={'md'} pb='13px' fontWeight='bold'  >Log In </Center>
            </Box>
            <Box borderBottom='4px' borderColor='gray.400' width={'35%'} _hover={{ borderColor: 'black' }}>
              <Center fontSize={'md'} pb='13px' fontWeight='bold'>Sign Up </Center>
            </Box>
          </Center>


          <VStack >
            <FormControl onSubmit={handleSubmit} w='full' px={'20px'}  >
              {/* Error Handler */}
              {/* <Box>
          {errors.map((error, idx) => {
            return <Text key={idx}>{error}</Text>
          }
          )}
        </Box> */}

              <Input
                placeholder='Enter Email'
                type="text"
                id="email"
                value={credential}
                onChange={handleCredentials}
                required
                borderBottom={'2px'}
                borderColor='black'
                width={'90%'}
                mb='10px'
                position={'relative'}
                left='20px'
              />

              <Input
                placeholder='Enter Password'
                type="password"
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                borderBottom={'2px'}
                borderColor='black'
                width={'90%'}
                position={'relative'}
                left='20px'
                 />
              <Center pt='10px' pb='20px'>
                <Button onClick={handleSubmit} type="submit" color='white' bg='black'>Log In</Button>
              </Center>

            </FormControl>
          </VStack>
          <footer>
            <p>Christian Brown</p>
            <div class="networking">
              <a href="https://www.linkedin.com/in/christian-brown-8770311ba/">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="mailto:Chrismbh4@gmail.com">
                <i class="fas fa-envelope-square"></i>
              </a>

              <a href="https://github.com/chrisbh4">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </footer>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
