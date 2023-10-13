import React from "react"
import { useState } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { getCreatedShoe, getAllShoes } from "../../../store/shoes.js"
// import { useNavigate } from "react-router-dom"
import "./NewShoeForm.css"

import {
    FormControl,
    FormLabel,
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    Heading,
    Grid,
    Flex,
    Button,
    Textarea,
    Center,
} from '@chakra-ui/react'


function NewShoesForm({ onClose }) {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const sellerId = useSelector((state) => state.session.user?.id)

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
    const updateImageFile = (e) => setImageFile(e.target.files[0])
    const updateBrand = (e) => setBrand(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)


    const onSubmit = async (e) => {
        e.preventDefault();
        let payload = { sellerId, title, shoeSize, imageFile, price, brand, description }
        const data = await dispatch(getCreatedShoe(payload))
        await dispatch(getAllShoes())

        if (!data?.errors) {
            // TODO: Create User Profile and redirect user to show new shoe being listed under them
            // navigate(`/home`)
            alert("Your Shoe has now been listed for sale.")
            onClose();
        }
        else {
            setErrors(data?.errors)
        }
        return data
    }

    // TODO: Add live input validation as a next feature
    return (
        <>
            <FormControl pt={"2%"}   >
                <Box   px='25%'  >
                    <Heading size="lg" fontWeight="semibold" color="gray.900" ml={"4%"}>Shoe Details</Heading>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        p="4%"
                    >
                        <Flex justify={'start'}>
                            <Box w={'40%'}>
                                <FormLabel>Shoe Title</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' placeholder="Shoe Title" onChange={updateTitle} />
                                {errors.includes("Shoe title must be greater than 5 characters") && <Center color={'red.400'}>Shoe title must be greater than 5 characters</Center>}
                            </Box>
                            <Box w={'40%'}>
                                <FormLabel ml={'6%'}>Shoe Size</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' placeholder="Shoe Size" ml={'6%'} onChange={updateShoeSize} />
                                {errors.includes("Please provide a shoe size in mens between 4 and 18") && <Center color={'red.400'}>Please provide a shoe size in mens between 4 and 18</Center>}
                            </Box>
                        </Flex>
                        <Box w={"70%"}>
                            <FormLabel>Description</FormLabel>
                            <Textarea borderColor={"black"} bg='gray.50' h={"90px"} placeholder="Description" onChange={updateDescription} />
                                {errors.includes("Description must be at least 10 characters long.") && <Center color={'red.400'}>Description must be at least 10 characters long.</Center>}
                        </Box>
                        <Box w={"35%"} mt={"4%"} >
                            <FormLabel>Brand</FormLabel>
                            <Input borderColor={"black"} bg='gray.50' placeholder="Brand" onChange={updateBrand} />
                                {errors.includes("Please select a shoe brand") && <Center color={'red.400'}>Please select a shoe brand</Center>}
                        </Box>
                        <Box w={"35%"}>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='$' />
                                <Input borderColor={"black"} bg='gray.50' placeholder="Price" onChange={updatePrice} />
                            </InputGroup>
                                {errors.includes("Please provide a price value for this shoe greater than $0.99") && <Center color={'red.400'}>Please provide a price value for this shoe greater than $0.99</Center>}
                        </Box>
                        <Box w={"50%"} pb={"5%"} >
                            <FormLabel>Upload Images</FormLabel>
                            <Input borderColor={"black"} type="file" placeholder="Upload Images" border={"none"} onChange={updateImageFile} />
                        </Box>
                        <Flex justify={'flex-start'}>
                        <Button w={"30%"} mt={"1%"} onClick={onSubmit} colorScheme="green">Submit</Button>
                        <Button w={"30%"} mt={"1%"} ml={"4%"} onClick={onClose} colorScheme="blue">Close</Button>
                        </Flex>
                    </Grid>
                    <Box color={"red.400"}  >
                    </Box>
                </Box>
            </FormControl>
        </>
    )
}



export default NewShoesForm
