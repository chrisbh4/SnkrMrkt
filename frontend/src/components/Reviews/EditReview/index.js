import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchDeleteReview, fetchEditReview } from "../../../store/reviews"
import { getAllShoes } from "../../../store/shoes"
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


function EditReviewChakraForm({ onClose, review }) {
    const dispatch = useDispatch()
    const reviewId = review.id
    const user = useSelector((state) => state.session.user)
    const userId = useSelector((state) => state.session.user?.id)
    const shoeId = review?.shoeId
    const [comment, setComment] = useState(review?.comment)
    const [rating, setRating] = useState(review?.rating)
    const [image, setImage] = useState(review?.image)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setComment(review?.comment)
        setRating(review.rating)
        setImage(review.image)
    }, [review.rating, review.comment, review.image])

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
        const data = await dispatch(fetchEditReview(shoeId, userId, comment, rating, image, reviewId))
        if (!data.errors) {
            await dispatch(getAllShoes())
            onClose()
        } else {
            setErrors(data)
            return data
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(fetchDeleteReview(reviewId))
        await dispatch(getAllShoes())
        onClose()
    }


    // TODO: Add live input validation as a next feature
    return (
        <>
            <FormControl pt={"2%"}   >
                <Box pb={8} px='25%'  >
                    <Heading size="lg" fontWeight="semibold" color="gray.900" ml={"4%"}>Edit {user?.username}'s review</Heading>
                    <Grid
                        templateRows="repeat(5, 1fr)"
                        templateColumns="repeat(1, 1fr)"
                        gap={4}
                        p="4%"
                    >
                        <Box color={"red.400"} hidden={!errors.errors?.length}  >
                            {errorHandler}
                        </Box>
                        <Box h={'20'} w={"70%"}>
                            <FormLabel>Comment </FormLabel>
                            <Textarea borderColor={"black"} bg='gray.50' h={"90px"} placeholder={comment} onChange={updateComment} />
                        </Box>
                        <Box h={'20'} w={"35%"} mt={"2%"} >
                            <FormLabel>Rating</FormLabel>
                            <Input borderColor={"black"} bg='gray.50' placeholder={rating} onChange={updateRating} />
                        </Box>

                        <Flex justify={'flex-start'}>
                            <Button w={"30%"} mt={"1%"} onClick={onSubmit} colorScheme="green">Submit</Button>
                            <Button w={"30%"} mt={"1%"} ml={'3%'} onClick={handleDelete} colorScheme="green">Delete</Button>
                        </Flex>
                    </Grid>

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
export default EditReviewChakraForm
