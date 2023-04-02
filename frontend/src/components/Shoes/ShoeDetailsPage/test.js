import React, { useState, useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import * as sessionActions from '../../../store/session';
import "./ShoeDetails.css"
import ShoeReviews from "../../Reviews/ShoeReviews/ShoeReviews"
import { getAllShoes, getOneShoe } from "../../../store/shoes"
import { addShoeToCart } from "../../../store/shoppingCart"
import { fetchMostPopular } from '../../../store/stockX';
import AddToCartComponent from './Checkout-Box';
import {
  Grid,
  Center,
  GridItem,
  Box,
  VStack,
  Checkbox,
  Button,
  Text,
  Flex,
  SimpleGrid,
  Select,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react'
import Navigation from "../../Navigation"

function DetailsTest() {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const shoeId = params.id

  useEffect(() => {
    dispatch(getAllShoes())
    dispatch(getOneShoe(shoeId))
    dispatch(fetchMostPopular())
  }, [dispatch, shoeId]);


  const stockXdata = useSelector((state) => state.stockXapi)
  const testData = stockXdata[0]
  console.log("DATA : " , stockXdata)


  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id
    }
    return 0.5;
  })

  const shoe = useSelector((state) => state.shoes[shoeId])
  const cart = useSelector((state) => state.shoppingCart)



  //* Checks if Image string contains either jpeg, png, or image inside it's string
  let imageCheck;
  if (shoe?.image.includes("jpeg") || shoe?.image.includes("png") || shoe?.image.includes("image")) {
    imageCheck = <img src={shoe?.image} alt={shoe?.title}></img>
  } else {
    imageCheck = <img className="bad-image" alt={shoe?.title}></img>

  }



  // * Reset layout with Box and Flex instead of grid

  const addToCart = async () => {
    await dispatch(addShoeToCart(shoe, cart))
    console.log(shoe.id)
    alert("Shoe has been added to your cart!")
    navigate("/home")
    return
  }


  const shoeSellerId = shoe?.sellerId;


  let sellerChecker;
  if (userId) {
    if (userId === shoeSellerId) {
      sellerChecker = (
        <div>
          <Link to={`/shoes/${shoe?.id}/edit`} key={shoe?.id}>
            <button className="shoe-details-edit-button">Edit</button>
          </Link>
        </div>
      )
    }
  } else {
    return sellerChecker;
  }
  let addToCartVerfication;
  if (userId !== shoeSellerId && userId > 0.99) {
    addToCartVerfication = (
      <div>
        {/* <Link to={`/`}> */}
        <button className="addToCart-button" onClick={addToCart}> Add to Cart </button>
        {/* </Link> */}
      </div>
    )
  }



  return (
    <Box px={"15%"} h='full' bg='#f1e7e7' pb='20px' >
      <Box pl='10%' bg='gray.300'>
        <Box h='75px'  >
          <Text
            fontSize={'4xl'}
            pl='2px'
          > {shoe?.title}</Text>
        </Box>

        <Flex>
          <Box h='full' w='45%'  >
            <Image
              src={shoe?.image}
              boxSize='550px'
               />
          </Box>
          <Center w='30%' >
            <AddToCartComponent />
          </Center>
        </Flex>

        <Box pb='3' pt='2'  >
          <Flex  fontWeight={'bold'} fontSize='lg' >
            <Box w='67%'  h='10' >Product Detials </Box>
            <Box w='full' h='10' pl='5%' >Product Description </Box>
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
          <Box w='50%' pb='10' pl='4%'>
            <Text fontSize={'lg'} fontWeight='semibold'   w='75%' >
              {testData?.details.description}
            </Text>
          </Box>


        </Flex>
        <Box borderTop={'22px'} borderColor='black' >
          <Text fontSize={'2xl'} fontWeight='bold' >Related Products</Text>
          <Flex >
            <Link href='/home'>
            <Image
              src={shoe?.image}
              boxSize='250px'
              border={'1px'}
              />
              </Link>

            <Link href='/home'>
            <Image
              src={shoe?.image}
              boxSize='250px'
              border={'1px'}
              />
              </Link>

            <Link href='/home'>
            <Image
              src={shoe?.image}
              boxSize='250px'
              border={'1px'}
              />
              </Link>

            <Link href='/home'>
            <Image
              src={shoe?.image}
              boxSize='250px'
              border={'1px'}
              />
              </Link>

            <Link href='/home'>
            <Image
              src={shoe?.image}
              boxSize='250px'
              border={'1px'}
              />
              </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}


export default DetailsTest;
