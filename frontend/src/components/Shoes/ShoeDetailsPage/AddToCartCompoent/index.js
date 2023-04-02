import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { getAllShoes, getOneShoe } from "../../../../store/shoes"
import { addShoeToCart } from "../../../../store/shoppingCart"

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




function AddToCartComponent({shoeId}) {
    const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // const shoeId = 4

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
        <Link to={`/shoes/${shoe?.id}/edit`} key={shoe.id} w=''>
            <Button >Edit</Button>
          </Link>
      )
    }
  }
  let addToCartVerfication;
  if (userId !== shoeSellerId && userId > 0.99) {
    addToCartVerfication = (
        <Button w='40%' onClick={addToCart}> Add to Cart </Button>
    )
  }

    return (
        <Box   w='500px' border={'1px'} p='20px'>
            <Box>
              <Box p='10px'>
                <Select placeholder='Size:'>
                  {sizeChart.map((chart) => {
                    return (
                      <option key={chart.id} value={chart.size} >{chart.size}</option>
                      )
                    })}
                </Select>
            </Box>

          <Flex w='full' justify={'space-around'} gap='9' mt='20px'>
            <Button w='40%'>
                Place Bid
            </Button>
            {sellerChecker}
            {addToCartVerfication}
          </Flex>
            </Box>
        </Box>
    )
}

export default AddToCartComponent
