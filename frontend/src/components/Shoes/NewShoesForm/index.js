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
            <FormControl  >
                <Box borderBottom="1px" borderColor="gray.100" pb={12} px='25%' >
                    <Heading size="md" fontWeight="semibold" color="gray.900">Personal Information</Heading>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4} // optional gap between grid items
                        bg={"gray.400"}
                        p={"4%"}
                    >
                        <Flex h={'20'} bg="blue.500" justify={'start'}>
                            <Box w={'30%'}>
                                <FormLabel>First Name</FormLabel>
                                <Input bg='gray.200' placeholder="First Name" />
                            </Box>
                            <Box w={'30%'}>
                                <FormLabel ml={'6%'}>Last Name</FormLabel>
                                <Input  bg='gray.200' placeholder="Last Name" ml={'6%'} />
                            </Box>
                        </Flex>
                        <Box h={'20'} bg="green.500">
                            <Input w={'30%'} bg='gray.200' placeholder="Email" />
                        </Box>
                        <Box h={'20'} bg="red.500">
                            <Input w={'30%'} bg='gray.200' placeholder="Country" />
                        </Box>
                        <Box h={'20'} bg="purple.500">
                            <Input w={'30%'} bg='gray.200' placeholder="Street Address" />
                        </Box>
                        <Flex h={'20'} bg="blue.500" justify={'start'}>
                            <Input w={'15%'} bg='gray.200' placeholder="City" />
                            <Input w={'15%'} bg='gray.200' placeholder="State" ml={'6%'} />
                            <Input w={'15%'} bg='gray.200' placeholder="Zip" ml={'6%'} />
                        </Flex>
                    </Grid>
                </Box>

            </FormControl>


        </>
    )
}



export default NewShoesForm
