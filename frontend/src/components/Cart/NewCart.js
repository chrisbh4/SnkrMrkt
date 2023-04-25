import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { purchaseFromCart } from "../../store/shoppingCart";
import CartItem from "./CartItem";
import "./Cart.css"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    Heading,
    Text,
    Grid,
    Flex,
    Button,
    Textarea,
    Center,
    Image,
    Checkbox
} from '@chakra-ui/react'





function CheckoutForm() {
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        // e.preventDefault();
        // let payload = { sellerId, title, shoeSize, imageFile, price, brand, description }
        // const data = await dispatch(getCreatedShoe(payload))
        // await dispatch(getAllShoes())

        // if (!data?.errors) {
        //     alert("Your Shoe has now been listed for sale.")
        //     onClose();
        // }
        // else {
        //     setErrors(data?.errors)
        // }
        // return data
    }

    return (
        <>
            <Box px={'10%'}>
                <Flex   border={'solid'} borderColor={'red.400'}>
                    <Box w={"full"}>
                        <FormControl pt={"2%"}   >
                            <Box pb={8} px='25%'  >
                                <Box>
                                    <Text fontSize={'2xl'}>Contact information</Text>
                                    <Flex justify={'start'}>
                                        <Box w={'full'}>
                                            <FormLabel>Email Address</FormLabel>
                                            {/* <Input borderColor={"black"} bg='gray.50' onChange={} /> */}
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box mt={"8%"}>
                                    <Text fontSize={'2xl'}>Payment Details </Text>
                                    <Box w={'full'} mt={"2%"}>
                                        <FormLabel>Name on card</FormLabel>
                                        <Input borderColor={"black"} bg='gray.50' />
                                    </Box>
                                    <Box w={'full'} mt={"5%"}>
                                        <FormLabel>Card Number</FormLabel>
                                        <Input borderColor={"black"} bg='gray.50' />
                                    </Box>
                                    <Flex w={'full'} mt={"5%"}>
                                        <Box>
                                            <FormLabel>Expiration date</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' w={'120%'} />
                                        </Box>

                                        <Box w={'15%'} ml={'15%'}>
                                            <FormLabel>CVC</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                    </Flex>
                                </Box>

                                <Box mt={"8%"}>
                                    <Text fontSize={'2xl'}>Shipping Address</Text>
                                    <Box w={'full'} mt={"2%"}>
                                        <FormLabel>Company (optional)</FormLabel>
                                        <Input borderColor={"black"} bg='gray.50' />
                                    </Box>
                                    <Box w={'full'} mt={"5%"}>
                                        <FormLabel>Address</FormLabel>
                                        <Input borderColor={"black"} bg='gray.50' />
                                    </Box>
                                    <Box w={'full'} mt={"5%"}>
                                        <FormLabel>Apartment, suite, etc.</FormLabel>
                                        <Input borderColor={"black"} bg='gray.50' placeholder="(MM/YYYY)" />
                                    </Box>
                                    <Flex w={'full'} mt={"5%"}>
                                        <Box>
                                            <FormLabel>City</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>

                                        <Box>
                                            <FormLabel>State/Province</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>

                                        <Box>
                                            <FormLabel>Zip Code</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                    </Flex>
                                </Box>

                                <Box mt={"8%"}>
                                    <Text fontSize={'2xl'}>Billing Information</Text>
                                    <Flex w={'full'}>
                                        <Checkbox borderColor={"black"} bg='gray.50' checked />
                                        <FormLabel pt={"2%"}  ml={'2%'}>Same as shipping Information</FormLabel>
                                    </Flex>
                                </Box>

                                <Button w={"30%"} mt={"5%"} onClick={onSubmit} colorScheme="green">Submit</Button>
                                <Box color={"red.400"}  >
                                    {
                                        errors.map((error) => {
                                            if (error) {
                                                return (
                                                    <Center bg={"white"}>
                                                        <Text key={error.id} fontSize={"2xl"} >{error}</Text>
                                                    </Center>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </Box>
                            </Box>
                        </FormControl>
                    </Box>
                    <Box bg={'gray.500'} w={'full'}></Box>
                </Flex>
            </Box>
        </>
    )

}



export default CheckoutForm;
