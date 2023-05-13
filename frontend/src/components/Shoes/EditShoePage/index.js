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
    Text,
    Grid,
    Flex,
    Button,
    Textarea,
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

    console.log(errors.errors)




    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(getDeletedShoe(shoe.id))
        alert("Shoe has been deleted.");
        navigate('/home')
    }

    console.log(shoe)
    return (
        <>
            <FormControl pt={"2%"}   >
                <Box px='25%'  >
                    {/* <Heading size="lg" fontWeight="semibold" color="gray.900" ml={"4%"}>Edit Shoe Form</Heading> */}
                    <Box color={"red.400"}  >
                        {
                            errors.map((error) => {
                                if (error) {
                                    return (
                                        <Box bg={"white"}>
                                            <Text ml="4%" key={error.id} fontSize={"2xl"} >{error}</Text>
                                        </Box>
                                    )
                                }
                                return null;
                            })
                        }
                    </Box>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4}
                        p="4%"
                    // borderBottom={"1px"}
                    // borderColor={"gray.500"}
                    >
                        <Flex justify={'start'}>
                            <Box w={'40%'}>
                                <FormLabel>Shoe Title</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' onChange={updateTitle} placeholder={shoe?.title} />
                            </Box>
                            <Box w={'40%'}>
                                <FormLabel ml={'6%'}>Shoe Size</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' ml={'6%'} onChange={updateShoeSize} placeholder={shoe?.shoeSize} />
                            </Box>
                        </Flex>
                        <Box w={"70%"}>
                            <FormLabel>Description</FormLabel>
                            <Textarea borderColor={"black"} bg='gray.50' h={"100px"} onChange={updateDescription} placeholder={shoe?.description} />
                        </Box>
                        <Box w={"35%"} pt={"4%"}  >
                            <FormLabel>Brand</FormLabel>
                            <Input borderColor={"black"} bg='gray.50' onChange={updateBrand} placeholder={shoe?.brand} />
                        </Box>
                        <Box w={"35%"}   >
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='$' />
                                <Input borderColor={"black"} bg='gray.50' onChange={updatePrice} placeholder={shoe?.price} />
                            </InputGroup>
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
