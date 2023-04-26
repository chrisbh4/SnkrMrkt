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
    Checkbox,
    Select,
    border,
    VStack,
    Stack,
} from '@chakra-ui/react'





function CheckoutForm() {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const cart = Object.values(shoppingCart);


    let total = 0.00;
    cart.forEach((item) => {
        total += parseFloat(item.price)
    })
    const totalPriceOfShoes = total.toFixed(2)
    const feePrices = total * 0.01
    const stateTax = 2
    const pricePostTaxes = total + stateTax + feePrices
    const emptyCart = <Box pl={'4%'} pt={'2%'} fontSize={'xl'}>Cart is empty</Box>


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
            <Box>
                <Flex bg={'gray.100'}>
                    <Box w={"full"}>
                        <FormControl pt={"2%"}   >
                            <Box pb={8} px='25%'  >
                                <Box>
                                    <Text fontSize={'2xl'}>Contact information</Text>
                                    <Flex justify={'start'}>
                                        <Box w={'full'}>
                                            <FormLabel>Email Address</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                    </Flex>
                                </Box>


                                <Box w={"full"} border={'1px'} borderColor={'gray.300'} mt={"8%"}></Box>
                                <Box mt={"4%"}>
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

                                <Box w={"full"} border={'1px'} borderColor={'gray.300'} mt={"8%"}></Box>
                                <Box mt={"8%"}>
                                    <Text fontSize={'2xl'}>Shipping Information</Text>
                                    <Flex>
                                        <Box w={'full'} mt={"2%"}>
                                            <FormLabel>First Name</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                        <Box w={'full'} mt={"2%"}>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                    </Flex>

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
                                        <Input borderColor={"black"} bg='gray.50' />
                                    </Box>
                                    <Flex w={'full'} mt={"5%"}>
                                        <Box>
                                            <FormLabel>City</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>

                                        <Box>
                                            <FormLabel>Country</FormLabel>
                                            <Select borderColor={"black"} bg='gray.50' />
                                        </Box>

                                    </Flex>
                                    <Flex>

                                        <Box mt={'5%'}>
                                            <FormLabel>State/Province</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>

                                        <Box mt={'5%'}>
                                            <FormLabel>Zip Code</FormLabel>
                                            <Input borderColor={"black"} bg='gray.50' />
                                        </Box>
                                    </Flex>

                                    <Box mt={'5%'}>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input borderColor={"black"} bg='gray.50' />
                                    </Box>

                                </Box>

                                <Box w={"full"} border={'1px'} borderColor={'gray.300'} mt={"8%"}></Box>
                                <Box mt={"8%"}>
                                    <Text fontSize={'2xl'}>Billing Information</Text>
                                    <Flex w={'full'}>
                                        <Checkbox borderColor={"black"} bg='gray.50' defaultChecked />
                                        <FormLabel pt={"2%"} ml={'2%'}>Same as shipping Information</FormLabel>
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
                    <Stack w={'full'} p={'3%'}>
                        <Box bg={'gray.100'} w={'full'} minH={'500px'} maxH={'500px'} overflow={'scroll'} >
                            {cart.map((item) => (
                                <CartItem item={item} key={item.id} />
                            ))}
                        </Box>

                        <Box w={"full"} border={'1px'} borderColor={'gray.300'} mt={"8%"}></Box>
                        <Box>
                            <Flex justify={'space-between'}>
                                <Text>Subtotal</Text>
                                <Text>{totalPriceOfShoes > 0 ? `${totalPriceOfShoes}` : '$0.00'}</Text>
                            </Flex>
                            <Flex justify={'space-between'}>
                                <Text>Fees</Text>
                                <Text>{totalPriceOfShoes > 0 ? `${feePrices.toFixed(2)}` : null}</Text>
                            </Flex>
                            <Flex justify={'space-between'}>
                                <Text>Taxes</Text>
                                <Text>{totalPriceOfShoes > 0 ? `${stateTax.toFixed(2)}` : null}</Text>
                            </Flex>
                            <Flex justify={'space-between'}>
                                <Text>Total</Text>
                                <Text>{totalPriceOfShoes > 0 ? `${pricePostTaxes.toFixed(2)}` : '$0.00'}</Text>
                            </Flex>
                        </Box>
                    </Stack>
                </Flex>
            </Box>
        </>
    )

}



export default CheckoutForm;
