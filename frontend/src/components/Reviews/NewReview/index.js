import React from "react"
import { useState } from "react"
import { useSelector, useDispatch, } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"
import { useParams } from "react-router-dom"
import { fetchCreateReview } from "../../../store/reviews"
import { getAllShoes } from "../../../store/shoes"


import {
    FormControl,
    FormLabel,
    Box,
    Input,
    Heading,
    Grid,
    Flex,
    Button,
    Textarea,
} from '@chakra-ui/react'


function NewReviewChakraForm({ onClose }) {
    // const naviate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const shoeId = params.id;
    const userId = useSelector((state) => state.session.user?.id)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [image] = useState("")
    const [errors, setErrors] = useState([])

    const updateComment = (e) => setComment(e.target.value)
    const updateRating = (e) => setRating(e.target.value)

    let errorHandler;
    if (errors.errors) {
        errorHandler = errors.errors.map((error) => {
            return (
                <p key={error.id}>{error}</p>
            )
        })
    }
    else {
        errorHandler = null;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchCreateReview(shoeId, userId, comment, rating, image))
        if (!data.errors) {
            alert("Your review has been created :)")
            // naviate(`/shoes/${shoeId}`)
            await dispatch(getAllShoes())
            onClose()
        }
        else {
            setErrors(data)
        }
        return data
    }

    return (
        <>
            <FormControl pt={"2%"}   >
                <Box pb={8} px='25%'  >
                    <Heading size="lg" fontWeight="semibold" color="gray.900" ml={"4%"}>Create a Review</Heading>
                    <Grid
                        templateRows="repeat(3, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4}
                        p="4%"
                    // borderBottom={"1px"}
                    // borderColor={"gray.500"}
                    >
                        <Box color={"red.400"} hidden={!errors.errors?.length}  >
                            {errorHandler}
                        </Box>
                        <Box h={'20'} w={"70%"}>
                            <FormLabel>Comment </FormLabel>
                            <Textarea borderColor={"black"} bg='gray.50' h={"90px"} placeholder="Seller/Shoe review" onChange={updateComment} />
                        </Box>
                        <Box h={'20'} w={"35%"} mt={"4%"} >
                            <FormLabel>Rating</FormLabel>
                            <Input borderColor={"black"} bg='gray.50' placeholder="Rating" onChange={updateRating} />
                        </Box>

                        <Flex justify={'flex-start'}>
                            <Button w={"30%"} mt={"1%"} onClick={onSubmit} colorScheme="green">Submit</Button>
                            <Button w={"30%"} mt={"1%"} ml={"4%"} onClick={onClose} colorScheme="blue">Close</Button>
                        </Flex>
                    </Grid>

                </Box>

            </FormControl>

        </>
    )
}
export default NewReviewChakraForm;
