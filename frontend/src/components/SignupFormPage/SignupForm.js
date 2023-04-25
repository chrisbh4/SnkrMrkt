import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

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
    Box,
} from '@chakra-ui/react'



function SignUpForm() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const sizeChart = [
        { id: 1, size: 3 },
        { id: 2, size: 3.5 },
        { id: 3, size: 4 },
        { id: 4, size: 4.5 },
        { id: 5, size: 5 },
        { id: 6, size: 5.5 },
        { id: 7, size: 6 },
        { id: 8, size: 6.5 },
        { id: 9, size: 7 },
        { id: 10, size: 7.5 },
        { id: 11, size: 8 },
        { id: 12, size: 8.5 },
        { id: 13, size: 9 },
        { id: 14, size: 9.5 },
        { id: 15, size: 10 },
        { id: 16, size: 10.5 },
        { id: 17, size: 11 },
        { id: 18, size: 11.5 },
        { id: 19, size: 12 },
        { id: 20, size: 12.5 },
        { id: 21, size: 13 },
        { id: 22, size: 13.5 },
        { id: 23, size: 14.5 },
        { id: 24, size: 15 },
    ]

    if (sessionUser) return navigate('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(sessionActions.signup({ email, username, password }))

        if (data?.errors) {
            if (password !== confirmPassword) {
                const err = [...data?.errors, "Password and Confirm Password must match"]
                setErrors(err)
            } else {
                setErrors(data?.errors)
            }
        }
        navigate('/')
        return data
    };

    return (
        <>
            <Button onClick={onOpen}
                color='rgba(255,255,255,1)' background='none' border-radius='square' letterSpacing='0.35em' fontSize='0.7em' padding='0.9em 4em'
                _hover={{ color: "rgba(0,0,0,0.8)", background_color: "#fff", box_shadow: "inset 0 0 0 rgba(255,255,255,0.3), 0 0 1.2em rgba(255,255,255,0.5)" }}
            >
                Sign up
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
                <ModalOverlay

                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader
                        bg={'black'}
                        color='white'
                    >
                        <Center fontSize={'30px'}>
                            SNKR MRKT
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton mt='3px' backgroundColor='white' _hover={{ bg: 'white' }} />
                    <ModalBody>
                        <Center pb='20px'>
                            <Button onClick={onClose} bg='white' borderBottom='4px' borderColor='gray.300' width={'35%'} _hover={{ borderColor: 'black', bg: "gray.100" }}>
                                <Center fontSize={'md'} pb='13px' fontWeight='bold'  >
                                    Log In
                                </Center>
                            </Button>
                            <Box borderBottom='4px' borderColor='gray.300' width={'35%'} _hover={{ borderColor: 'black' }}>
                                <Center fontSize={'md'} pb='13px' fontWeight='bold'>Sign Up </Center>
                            </Box>
                        </Center>



                        <FormControl onSubmit={handleSubmit}>

                            <VStack spacing={8} w='70%'
                                pos={'relative'}
                                left='15%'
                            >
                                <Box color={'red.400'} fontSize='lg' fontWeight={'bold'}>
                                    {errors.map((error, idx) => <Text key={idx}>{error}</Text>)}

                                </Box>

                                <Input
                                    placeholder="Email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    size={'lg'}
                                />
                                <Input
                                    placeholder="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    size={'lg'}
                                />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    size={'lg'}
                                />
                                <VStack w='full' spacing={2}>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        size={'lg'}
                                    />
                                    <Text
                                        fontSize={'10px'}
                                        pos='relative'
                                        right={'17%'}
                                    >
                                        At least 8 characters, 1 uppercase letter, 1 number & 1 symbol
                                    </Text>
                                </VStack>


                                {/* <Select
                                    placeholder='Shoe Size'
                                    size={'lg'}
                                >
                                    {sizeChart.map((chart) => {
                                        return (
                                            <>
                                                <option w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                                                    key={chart.id}
                                                //  onClick={() => handleSizeBg(chart)}
                                                //  style={{ backgroundColor: chart.id === selectedSize ? "red" : "",  color: chart.id === selectedSize ? "white" : "" }}
                                                >
                                                    {chart.size}
                                                </option>
                                            </>
                                        )
                                    })}
                                </Select> */}

                                <Button
                                    // className="signup-submit"
                                    type="submit"
                                    onClick={handleSubmit}
                                    bg='black'
                                    color={'white'}
                                >
                                    Sign Up
                                </Button>
                            </VStack>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg='black' color={'white'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default SignUpForm
