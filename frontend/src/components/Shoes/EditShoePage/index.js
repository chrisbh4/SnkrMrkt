import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllShoes, getEditShoe, getDeletedShoe } from "../../../store/shoes"

import {
    FormControl,
    FormLabel,
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    Grid,
    Flex,
    Button,
    Textarea,
    Center
} from '@chakra-ui/react'



function EditShoesFormChakra({ shoe, onClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const shoeId = shoe?.id
    const [title, setTitle] = useState(shoe?.title)
    const [description, setDescription] = useState(shoe?.description)
    const [image, setImage] = useState(shoe?.image)
    const [brand, setBrand] = useState(shoe?.brand)
    const [errors, setErrors] = useState([])
    const [shoeSize, setShoeSize] = useState(shoe?.shoeSize)
    const [price, setPrice] = useState(shoe?.price)


    const updateTitle = (e) => setTitle(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateBrand = (e) => setBrand(e.target.value)
    const updateImageFile = (e) => setImage(e.target.files[0])


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getEditShoe(title, shoeSize, image, price, brand, description, shoeId))
        if (!data.errors) {
            // TODO: Create User Profile and redirect user to show Edited shoe being listed under them
            alert("Your changes have been updated.")
            dispatch(getAllShoes())
            onClose()
        }
        else {
            setErrors(data.errors)
        }
        return data
    }




    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(getDeletedShoe(shoe.id))
        alert("Shoe has been deleted.");
        navigate('/home')
    }
    
    return (
        <>
            <FormControl pt={"2%"}   >
                <Box px='25%'  >
                    <Box color={"red.400"}  >
                    </Box>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4}
                        p="4%"
                    >
                        <Flex justify={'start'}>
                            <Box w={'40%'}>
                                <FormLabel>Shoe Title</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' onChange={updateTitle} placeholder={shoe?.title} />
                                {errors.includes("Shoe title must be greater than 5 characters.") && <Center color={'red.400'}>Shoe title must be greater than 5 characters.</Center>}
                            </Box>
                            <Box w={'40%'}>
                                <FormLabel ml={'6%'}>Shoe Size</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' ml={'6%'} onChange={updateShoeSize} placeholder={shoe?.shoeSize} />
                                {errors.includes("Please provide a shoe size in mens between 4 and 18.") && <Center color={'red.400'}>Please provide a shoe size in mens between 4 and 18.</Center>}
                            </Box>
                        </Flex>
                        <Box w={"70%"}>
                            <FormLabel>Description</FormLabel>
                            <Textarea borderColor={"black"} bg='gray.50' h={"100px"} onChange={updateDescription} placeholder={shoe?.description} />
                                {errors.includes("Description must be at least 10 characters long.") && <Center color={'red.400'}>Description must be at least 10 characters long.</Center>}
                        </Box>
                        <Box w={"35%"} pt={"4%"}  >
                            <FormLabel>Brand</FormLabel>
                            <Input borderColor={"black"} bg='gray.50' onChange={updateBrand} placeholder={shoe?.brand} />
                                {errors.includes("Please select a shoe brand.") && <Center color={'red.400'}>Brand must be 5 characters long.</Center>}
                        </Box>
                        <Box w={"35%"}   >
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='$' />
                                <Input borderColor={"black"} bg='gray.50' onChange={updatePrice} placeholder={shoe?.price} />
                            </InputGroup>
                                {errors.includes("Please provide a price value for this shoe greater than $0.99 .") && <Center color={'red.400'}>Please provide a price value for this shoe greater than $0.99 .</Center>}
                        </Box>
                        <Box w={"50%"} >
                            <FormLabel>Upload Images</FormLabel>
                            <Input borderColor={"black"} type="file" border={"none"} onChange={updateImageFile} />
                        </Box>

                        <Flex >
                            <Button w={"30%"} mt={"1%"} onClick={onSubmit} colorScheme="green">Submit</Button>
                            <Button w={"30%"} mt={"1%"} ml={"4%"} onClick={handleDelete} colorScheme="green">Delete</Button>
                            <Button w={"30%"} mt={"1%"} ml={"4%"} onClick={onClose} colorScheme="blue">Close</Button>
                        </Flex>
                    </Grid>
                </Box>
            </FormControl>
        </>
    )
}

export default EditShoesFormChakra
