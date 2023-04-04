import React from "react"
import { useState } from "react"
import { useSelector, useDispatch, } from "react-redux"

import { getCreatedShoe } from "../../../store/shoes.js"
import { useNavigate } from "react-router-dom"
import "./NewShoeForm.css"


import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Box,
    Input,
    InputGroup,
    Heading,
    Text,
    Grid,
    Select,
    VStack,
    Flex
} from '@chakra-ui/react'



function NewShoesForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const sellerId = useSelector((state) => state.session.user.id)

    // const [title, setTitle] = useState("")
    // const [shoeSize, setShoeSize] = useState(0)
    // // const [image, setImage] = useState("")
    // const [imageFile, setImageFile] = useState("")
    // const [brand, setBrand] = useState("")
    // const [description , setDescription] = useState("")

    // const [price, setPrice] = useState(0.00)
    // const [errors, setErrors] = useState([]);

    // const updateTitle = (e) => setTitle(e.target.value)
    // const updateShoeSize = (e) => setShoeSize(e.target.value)
    // // const updateImage = (e) => setImage(e.target.value)
    // const updateImageFile = (e) => setImageFile(e.target.files[0])
    // const updateBrand = (e) => setBrand(e.target.value)
    // const updatePrice = (e) => setPrice(e.target.value)
    // const updateDescription= (e) => setDescription(e.target.value)


    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     let payload = {sellerId, title, shoeSize, imageFile, price, brand, description}
    //     const data = await dispatch(getCreatedShoe(payload))
    //     // const data = await dispatch(getCreatedShoe(sellerId, title, shoeSize, imageFile, price, brand, description))

    //     if (!data?.errors) {
    //         navigate(`/home`)
    //          alert("Your Shoe has now been listed for sale.")
    //     }
    //     else {
    //         setErrors(data?.errors)
    //     }
    //     return data
    // }

    return (
        <>
            <FormControl pt={"2%"}  >
                <Box pb={12} px='25%'  >
                    <Heading size="md" fontWeight="semibold" color="gray.900">Personal Information</Heading>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4} // optional gap between grid items
                        // bg={"gray.300"}
                        p={"4%"}
                        borderBottom={"1px"}
                        borderColor={"gray.500"}
                    >
                        <Flex h={'20'} justify={'start'}>
                            <Box w={'40%'}>
                                <FormLabel>First Name</FormLabel>
                                <Input bg='gray.50' placeholder="First Name" />
                            </Box>
                            <Box w={'40%'}>
                                <FormLabel ml={'6%'}>Last Name</FormLabel>
                                <Input bg='gray.50' placeholder="Last Name" ml={'6%'} />
                            </Box>
                        </Flex>
                        <Box h={'20'} w={"50%"}>
                            <FormLabel>Email</FormLabel>
                            <Input bg='gray.50' placeholder="Email" />
                        </Box>
                        <Box h={'20'} w={"35%"} >
                            <FormLabel>Country</FormLabel>
                            <Input bg='gray.50' placeholder="Country" />
                        </Box>
                        <Box h={'20'} w={"50%"} >
                            <FormLabel>Street Address</FormLabel>
                            <Input   bg='gray.50' placeholder="Street Address" />
                        </Box>
                        <Flex h={'20'} justify={'start'}>
                            <Box w={"30%"}>
                                <FormLabel>City</FormLabel>
                                <Input bg='gray.50' placeholder="City" />
                            </Box>
                            <Box w={"30%"} ml={"2.5%"}>
                                <FormLabel>State</FormLabel>
                                <Input bg='gray.50' placeholder="State" />
                            </Box>
                            <Box w={"30%"} ml={"2.5%"}>
                                <FormLabel>Zip</FormLabel>
                                <Input bg='gray.50' placeholder="Zip" />
                            </Box>
                        </Flex>
                    </Grid>
                </Box>

            </FormControl>


        </>
    )
}



export default NewShoesForm
