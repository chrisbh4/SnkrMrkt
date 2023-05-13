import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
// import * as sessionActions from '../../../store/session';
import "./ShoeDetails.css"
// import ShoeReviews from "../../Reviews/ShoeReviews/ShoeReviews"
// import { addShoeToCart } from "../../../store/shoppingCart"
import { getOneShoe } from "../../../store/shoes"
import { fetchMostPopular } from '../../../store/stockX';
import AddToCartComponent from './AddToCartCompoent';
import {
  Center,
  Box,
  Text,
  Flex,
  Image,
  Link,
  Grid,
  GridItem
} from '@chakra-ui/react'
import CreateReviewModal from '../../Reviews/NewReview/ModalForm';
import EditReviewModal from '../../Reviews/EditReview/ModalForm';



function ShoeDetialsChakra() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const shoeId = params.id

  useEffect(() => {
    dispatch(getOneShoe(shoeId))
    dispatch(fetchMostPopular())
  }, [dispatch, shoeId]);


  const stockXdata = useSelector((state) => state.stockXapi)
  const testData = stockXdata[0]

  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user?.id
    }
    return 0.5;
  })

  const shoe = useSelector((state) => state.shoes[shoeId])
  // const cart = useSelector((state) => state.shoppingCart)

  //* Checks if Image string contains either jpeg, png, or image inside it's string
  let imageCheck;
  if (shoe?.image.includes("jpeg") || shoe?.image.includes("png") || shoe?.image.includes("image")) {
    imageCheck = <img src={shoe?.image} alt={shoe?.title}></img>
  } else {
    imageCheck = <img className="bad-image" alt={shoe?.title}></img>
  }


  return (
    // <Box px={"15%"} h='full' bg='#f1e7e7' pb='20px' >
    <Box px={"15%"} h='full' pb='20px' >
      <Box pl='10%'>
        <Box h='75px' pt='3'>
          <Text
            fontSize={'4xl'}
            pl='2px'
          > {shoe?.title}</Text>
        </Box>

        <Flex>
          <Box h='full' w='50%'  >
            <Image
              src={shoe?.image}
              boxSize='550px'
            />
          </Box>
          <Center w='45%' >
            <AddToCartComponent shoeId={shoeId} />
          </Center>
        </Flex>

        <Box pb='3' pt='2'  >
          <Flex fontWeight={'bold'} fontSize='lg' >
            <Box w='67%' h='10' >Product Detials </Box>
            <Box w='full' h='10' pl='13%' >Product Description </Box>
          </Flex>
        </Box>

        <Flex >
          <Box w='40%' >
            <Flex justify={'space-between'} w='85%'>
              <Box>
                <Text>Style</Text>
                <Text>Colorway</Text>
                <Text>Retial Price</Text>
                <Text whiteSpace={'nowrap'} >Release Date</Text>
              </Box>

              <Box>
                <Text whiteSpace={'nowrap'} >{testData?.details.type} </Text>
                <Text whiteSpace={'nowrap'} >{testData?.details.colorway} </Text>
                <Text>{testData?.details.retail} </Text>
                <Text>{testData?.details.releaseDate} </Text>
              </Box>
            </Flex>
          </Box>
          <Box w='50%' pb='5' pl='11%'>
            <Text fontSize={'lg'} w='full' h='90%' fontWeight='semibold' overflow={'scroll'} >
              {/* {shoe?.description} */}
              {testData?.details.description}
            </Text>
          </Box>


        </Flex>
        {/* Related Products () */}
        {/* Write a while loop while iterating through the Shoes array up to i >= 5 */}
        <Box borderTop={'22px'} borderColor='black' >
          <Text fontSize={'2xl'} fontWeight='bold' >Related Products</Text>
          <Flex >
            <Link href='/shoes/1'>
              <Image
                src={"https://theplug-app-aws.s3.us-west-1.amazonaws.com/seed-1.png"}
                boxSize='250px'
                border={'1px'}
              />
            </Link>

            <Link href='/shoes/2'>
              <Image
                src={"https://theplug-app-aws.s3.us-west-1.amazonaws.com/seed-2.png"}
                boxSize='250px'
                border={'1px'}
              />
            </Link>

            <Link href='/shoes/3'>
              <Image
                src={"https://theplug-app-aws.s3.us-west-1.amazonaws.com/seed-3.png"}
                boxSize='250px'
                border={'1px'}
              />
            </Link>

            <Link href='/shoes/4'>
              <Image
                src={"https://theplug-app-aws.s3.us-west-1.amazonaws.com/seed-4.png"}
                boxSize='250px'
                border={'1px'}
              />
            </Link>

            <Link href='/shoes/5'>
              <Image
                src={"https://theplug-app-aws.s3.us-west-1.amazonaws.com/seed-5.png"}
                boxSize='250px'
                border={'1px'}
              />
            </Link>
          </Flex>
        </Box>

        <Box>
          <Text fontSize={'2xl'} fontWeight='bold' pt={"2%"} >{shoe?.title} Reviews</Text>

          <Box py={"2%"}>
            <CreateReviewModal />
          </Box>

          <Grid templateColumns='10% 1fr 1fr' pb={"3"}>
            <GridItem w='100%' h='10' bg='none' fontSize={"20"} fontWeight={"bold"} >Ratings</GridItem>
            <GridItem w='100%' h='10' bg='none' fontSize={"20"} fontWeight={"bold"} whiteSpace={"nowrap"} pr={"4%"}>Comments</GridItem>
          </Grid>

          {shoe?.Reviews.map((review) => {
            if (review.userId === userId) {
              return (
                <Grid templateColumns='10% 1fr 1fr'>
                  <GridItem h='10' bg='none'>{review.rating}</GridItem>
                  <GridItem mr={"8%"} h='10' bg='none' whiteSpace={"nowrap"} pr={"4%"}>{review.comment}</GridItem>
                  <GridItem ml={"8%"} h='10' bg='none'><EditReviewModal /></GridItem>
                </Grid>
              )
            }
            return (
              <Grid templateColumns='10% 1fr 1fr'>
                <GridItem h='10' bg='none'>{review.rating}</GridItem>
                <GridItem h='10' bg='none'>{review.comment}</GridItem>
              </Grid>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}


export default ShoeDetialsChakra;
