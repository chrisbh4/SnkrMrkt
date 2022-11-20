import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import * as sessionActions from '../../../store/session';
import "./ShoeDetails.css"
import ShoeReviews from "../../Reviews/ShoeReviews/ShoeReviews"
import { getAllShoes, getOneShoe } from "../../../store/shoes"
import { addShoeToCart } from "../../../store/shoppingCart"

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
  Input,
  Stack,
  Form,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import Navigation from "../../Navigation"

function DetailsTest() {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const shoeId = 1

  useEffect(() => {
    dispatch(getAllShoes())
    dispatch(getOneShoe(shoeId))
  }, [dispatch]);


  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id
    }
    return 0.5;
  })

  const shoe = useSelector((state) => state.shoes[shoeId])
  const cart = useSelector((state) => state.shoppingCart)


  const sizeChart = [
    { id: 1, size: 3 },
    { id: 2, size: 3.5 },
    { id: 3, size: 4 },
    { id: 4, size: 4.5 },
    { id: 5, size: 5 },
    { id: 6, size: 5.5 },
    { id: 7, size: 6 },
    { id: 8, size: 6.5 },
    { id: 9, size: 7 },
    { id: 10, size: 7.5 },
    { id: 11, size: 8 },
    { id: 12, size: 8.5 },
    { id: 13, size: 9 },
    { id: 14, size: 9.5 },
    { id: 15, size: 10 },
    { id: 16, size: 10.5 },
    { id: 17, size: 11 },
    { id: 18, size: 11.5 },
    { id: 19, size: 12 },
    { id: 20, size: 12.5 },
    { id: 21, size: 13 },
    { id: 22, size: 13.5 },
    { id: 23, size: 14.5 },
    { id: 24, size: 15 },
  ]
  console.log("TEST")
  console.log(shoe)

  //* Checks if Image string contains either jpeg, png, or image inside it's string
  let imageCheck;
  if (shoe?.image.includes("jpeg") || shoe?.image.includes("png") || shoe?.image.includes("image")) {
    imageCheck = <img src={shoe?.image} alt={shoe?.title}></img>
  } else {
    imageCheck = <img className="bad-image" alt={shoe?.title}></img>

  }





  const addToCart = async () => {
    await dispatch(addShoeToCart(shoe, cart))
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
          <Link to={`/shoes/${shoe?.id}/edit`} key={shoe.id}>
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
    <Box bg='gray.300' >
      <Box bg='red.500'
       h='100px'
      >
      <Text
        fontSize={'2xl'}
      >
        {shoe.title}
      </Text>
        <Box bg='gray.300' w='8%' p='2px' textAlign={'center'}>
          <Text  >Conditon: New </Text>
          </Box>
      </Box>

      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'

      >
        <GridItem rowSpan={2} colSpan={2} bg='blue.400'>
          <Box>

          <Image src={shoe.image} boxSize='400px' width={''} objectFit={'fill'} />
          </Box>
        </GridItem>
        <GridItem colSpan={2} bg='tomato.200'>
          Size Bar
          <Select placeholder='Select option'>
          {sizeChart.map((chart) => {
              return (
                <option key={chart.id} value={chart.size} >{chart.size}</option>
              )
            })}

          </Select>
        </GridItem>
        <GridItem colSpan={1} bg='green.300'>
          Last Sold
        </GridItem>
        <GridItem colSpan={1} bg='papayawhip'>
          <Center>Title</Center>
          <Button>Checkout</Button>
        </GridItem>
      </Grid>

      <Box bg='orange.500' h='200px'>
        Related Products
      </Box>

      <Box bg='brown.200' h='200px'>
        Description
      </Box>

    </Box>
  )
}


export default DetailsTest;
