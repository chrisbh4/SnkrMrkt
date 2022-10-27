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


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside Handle Submit")

    const data = await dispatch(sessionActions.login({ credential, password }))

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
    <Box p='30px'>
      <Center fontSize={'xl'} fontWeight='bold'>Log In </Center>
      <FormControl onSubmit={handleSubmit}  >
      {/* Error Handler */}
        {/* <Box>
          {errors.map((error, idx) => {
            return <Text key={idx}>{error}</Text>
          }
          )}
        </Box> */}

        <FormLabel >Email</FormLabel>
        <Input
          variant='flushed'
          placeholder='Enter Email'
          type="text"
          id="email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          borderBottom={'2px'}
          borderColor='black'
          width={'full'}
        />
        <FormLabel>Password</FormLabel>
        <Input
          variant='flushed'
          placeholder='Enter Password'
          type="password"
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          borderBottom={'2px'}
          borderColor='black'
          width={'full'} />

        <Button onSubmit={handleSubmit} type="submit" marginRight={'20px'}>Log In</Button>
      </FormControl>

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
  );
}

export default LoginForm;
