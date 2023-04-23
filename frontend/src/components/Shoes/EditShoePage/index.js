import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getAllShoes, getEditShoe, getDeletedShoe } from "../../../store/shoes"

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
    Image
} from '@chakra-ui/react'



function EditShoesFormChakra() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const shoeId = params.id

    useEffect(() => {
        dispatch(getAllShoes())
    }, [dispatch]);

    const shoe = useSelector((state) => state.shoes[shoeId])

    const [title, setTitle] = useState(shoe?.title)
    const [description, setDescription] = useState(shoe?.description)
    const [image , setImage] = useState(shoe?.image)
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
        const data = await dispatch(getEditShoe(title, shoeSize, image, price, brand,description, shoeId))
        if (!data.errors) {
            // TODO: Create User Profile and redirect user to show Edited shoe being listed under them
            alert("Your shoe has now been succesfully edited for sale.")
            navigate(`/shoes/${shoeId}`)
        }
        else {
            setErrors(data)
        }
        return data
    }

   let errorHandler;
   if(errors.errors){
      errorHandler = errors.errors.map((error)=>{
               return (
                        <p key={error.id}>{error}</p>
                    )
           })
   }
   else{
        errorHandler=null;
   }


    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(getDeletedShoe(shoe.id))
        alert("Shoe has been deleted.");
        navigate('/home')
    }

console.log(shoe)
    return(
        <>
            <FormControl pt={"2%"}   >
                <Box pb={8} px='25%'  >
                    <Heading size="lg" fontWeight="semibold" color="gray.900" ml={"4%"}>Edit Shoe Form</Heading>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4}
                        p="4%"
                        // borderBottom={"1px"}
                        // borderColor={"gray.500"}
                    >
                        <Flex h={'20'} justify={'start'}>
                            <Box w={'40%'}>
                                <FormLabel>Shoe Title</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' onChange={updateTitle} placeholder={shoe?.title} />
                            </Box>
                            <Box w={'40%'}>
                                <FormLabel ml={'6%'}>Shoe Size</FormLabel>
                                <Input borderColor={"black"} bg='gray.50' ml={'6%'} onChange={updateShoeSize} placeholder={shoe?.shoeSize} />
                            </Box>
                        </Flex>
                        <Box h={'20'} w={"70%"}>
                            <FormLabel>Description</FormLabel>
                            <Textarea borderColor={"black"} bg='gray.50' h={"90px"} onChange={updateDescription} placeholder={shoe?.description} />
                        </Box>
                        <Box h={'20'} w={"35%"} mt={"2%"} >
                            <FormLabel>Brand</FormLabel>
                            <Input borderColor={"black"} bg='gray.50' onChange={updateBrand} placeholder={shoe?.brand} />
                        </Box>
                        <Box h={'20'} w={"35%"} mt={"2%"} >
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='$' />
                                <Input borderColor={"black"} bg='gray.50' onChange={updatePrice}  placeholder={shoe?.price} />
                            </InputGroup>
                        </Box>
                        <Box  w={"50%"} >
                            <FormLabel>Upload Images</FormLabel>
                            <Input borderColor={"black"} type="file" border={"none"} onChange={updateImageFile}  />
                        </Box>

                        <Flex >
                        <Button w={"30%"} mt={"1%"} onClick={onSubmit} colorScheme="green">Submit</Button>
                        <Button w={"30%"} mt={"1%"} ml={"4%"} onClick={handleDelete} colorScheme="green">Delete</Button>
                        </Flex>
                    </Grid>

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

                <Image
                    src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/New-Shoe-background-img.jpeg"
                    w={"full"}
                    h="300px"
                    fit="cover"
                />
            </FormControl>
        </>
    )
}

export default EditShoesFormChakra
