import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import * as sessionActions from '../../../store/session';
import "./ShoeDetails.css"
import ShoeReviews from "../../Reviews/ShoeReviews/ShoeReviews"
import { getAllShoes, getOneShoe } from "../../../store/shoes"
import { addShoeToCart } from "../../../store/shoppingCart"
import { fetchMostPopular } from '../../../store/stockX';
import AddToCartComponent from './AddToCartCompoent';
import {
  Center,
  Box,
  Text,
  Flex,
  Image,
  Link,
  VStack,
  Button,
  textDecoration,
} from '@chakra-ui/react'
import CreateReviewModal from '../../Reviews/NewReview/ModalForm';
import EditReviewModal from '../../Reviews/EditReview/ModalForm';



function ShoeDetialsChakra() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const shoeId = params.id

  useEffect(() => {
    dispatch(getOneShoe(shoeId))
    // dispatch(fetchMostPopular())
  }, [dispatch, shoeId]);


  const stockXdata = useSelector((state) => state.stockXapi)
  const testData = stockXdata[0]
  // Fetch all shoes from the store
  const allShoes = useSelector((state) => state.shoes)

  // Function to generate 5 unique random numbers
  function generateRandomShoes() {
    let randomNumbers = [];
    while (randomNumbers.length < 5) {
      let num = Math.floor(Math.random() * allShoes.length);
      if (!randomNumbers.includes(num)) {
        randomNumbers.push(num);
      }
    }
    return randomNumbers;
  }

  // Generate the random numbers
  const randomShoeIndices = generateRandomShoes();

  // In your JSX, map over the randomShoeIndices to render the shoe titles
  // {
  //   randomShoeIndices.map(index => (
  //     <Text key={index}>{allShoes[index].title}</Text>
  //   ))
  // }

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

  function generateRandomShoes() {
    let randomNumbers = [];
    while (randomNumbers.length < 5) {
      let num = Math.floor(Math.random() * 20) + 1;
      if (!randomNumbers.includes(num)) {
        randomNumbers.push(num);
      }
    } // This will log the array of 5 unique random numbers between 1 and 20
    return randomNumbers;
  }

  generateRandomShoes();


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
        <Box borderTop={'22px'} borderColor='black' >
          <Text fontSize={'2xl'} fontWeight='bold' >Related Products</Text>
          <Flex>
            {randomShoeIndices.map(index => (
              <Box
              // boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              marginLeft={'5px'}
              _hover={{
                backgroundColor: "#c7d4dd",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.5)"
              }}
              >
                <Link href={`/shoes/${index}`}>
                  <Image
                    src={allShoes[index]?.image}
                    boxSize='250px'
                    // border={'1px'}
                    p={'3px'}
                  />
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Reviews */}
        <Box>
          <Text fontSize={'2xl'} fontWeight='bold' pt={"2%"} >{shoe?.title} Reviews</Text>

          <Box py={"2%"}>
            <CreateReviewModal />
          </Box>

          {shoe?.Reviews.map((review) => {
            if (review.userId === userId) {
              return (
                <Flex>
                  <Text>{review.rating}</Text>
                  <Text ml={"4%"}>{review.comment}</Text>
                  <Box ml={"2%"}>
                    <EditReviewModal review={review} />
                  </Box>

                </Flex>
              )
            }
            return (
              <Flex>
                <Text>{review.rating}</Text>
                <Text ml={"4%"}>{review.comment}</Text>
              </Flex>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}


export default ShoeDetialsChakra;
