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
    InputLeftAddon,
    Heading,
    Text,
    Grid,
    Select,
    VStack,
    Flex,
    Button,
    Textarea
} from '@chakra-ui/react'



function NewShoesForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sellerId = useSelector((state) => state.session.user.id)

    const [title, setTitle] = useState("")
    const [shoeSize, setShoeSize] = useState(0)
    // const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")

    const [price, setPrice] = useState(0.00)
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)
    // const updateImage = (e) => setImage(e.target.value)
    const updateImageFile = (e) => setImageFile(e.target.files[0])
    const updateBrand = (e) => setBrand(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)


    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     let payload = {sellerId, title, shoeSize, imageFile, price, brand, description}
    //     const data = await dispatch(getCreatedShoe(payload))
    //     // const data = await dispatch(getCreatedShoe(sellerId, title, shoeSize, imageFile, price, brand, description))

    //     if (!data?.errors) {

    //         // TODO: Create User Profile and redirect user to show new shoe being listed under them
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
            <FormControl pt={"2%"} bg={"gray.400"} >
                <Box pb={12} px='25%'  >
                    <Heading size="lg" fontWeight="semibold" color="gray.900" ml={"4%"}>Personal Information</Heading>
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
                                <FormLabel>Shoe Title</FormLabel>
                                <Input bg='gray.50' placeholder="Shoe Title" />
                            </Box>
                            <Box w={'40%'}>
                                <FormLabel ml={'6%'}>Shoe Size</FormLabel>
                                <Input bg='gray.50' placeholder="Shoe Size" ml={'6%'} />
                            </Box>
                        </Flex>
                        <Box h={'20'} w={"70%"}>
                            <FormLabel>Description</FormLabel>
                            <Textarea bg='gray.50' h={"90px"} placeholder="Description" />
                        </Box>
                        <Box h={'20'} w={"35%"} mt={"2%"} >
                            <FormLabel>Brand</FormLabel>
                            <Input bg='gray.50' placeholder="Brand" />
                        </Box>
                        <Box h={'20'} w={"35%"} mt={"2%"} >
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='$' />
                                <Input bg='gray.50' placeholder="Price" />
                            </InputGroup>
                        </Box>
                        <Box h={'20'} w={"50%"} >
                            <FormLabel>Upload Images</FormLabel>
                            <Input bg='gray.50' placeholder="Upload Images" />
                        </Box>

                        <Button w={"30%"} mt={"1%"} colorScheme="green">Submit</Button>
                    </Grid>
                </Box>
            </FormControl>


        </>
    )
}



export default NewShoesForm
