import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { getAllShoes, getOneShoe } from "../../../../store/shoes"
import { addShoeToCart } from "../../../../store/shoppingCart"

import {
    Box,
    Button,
    Flex,
    Select,
  } from '@chakra-ui/react'
import EditShoeModalForm from '../../EditShoePage/ModalForm';

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
    { id: 23, size: 14 },
    { id: 24, size: 14.5 },
    { id: 25, size: 15 },
  ]


function AddToCartComponent({shoeId}) {
    const dispatch = useDispatch();
  // const params = useParams();
  const navigate = useNavigate();
  
  const [size, setSize] = useState("")

  const updateSize = async(e) => {
    setSize(e.target.value)
    return
  }

  useEffect(() => {
    dispatch(getAllShoes())
    dispatch(getOneShoe(shoeId))
  }, [dispatch, shoeId]);


  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id
    }
    return 0.5;
  })

  const shoe = useSelector((state) => state.shoes[shoeId])
  const cart = useSelector((state) => state.shoppingCart)
  const shoeSellerId = shoe?.sellerId;

  const addToCart = async () => {
    shoe.shoeSize = size

    if (size.length === 0 ){
      alert("Select a shoe size before adding to cart")
      return
    }

    await dispatch(addShoeToCart(shoe, cart))
    alert("Shoe has been added to your cart!")
    navigate("/home")
    return
  }


  const unavialableFeature = async () => {
    alert("Functionality coming soon!")
    return
  }


  let sellerChecker;
  if (userId) {
    if (userId === shoeSellerId) {
      sellerChecker = (
            <EditShoeModalForm px='30px' py='10px' shoe={shoe} >Edit</EditShoeModalForm>
      )
    }
  }
  let addToCartVerfication;
  if (userId !== shoeSellerId && userId > 0.99) {
    addToCartVerfication = (
      <Box w='500px' p='5%'>
        <Box>
          <Box p='10px'>
            <Select placeholder='Select Size:' variant={"filled"} w='90%'  onChange={updateSize} >
              {sizeChart.map((chart) => {
                return (
                  <option key={chart.id} value={chart.size} >{chart.size} </option>
                  )
                })}
            </Select>
        </Box>

          <Button w='40%' ml='2%' onClick={unavialableFeature}>Place Bid</Button>
          <Button w='40%' ml='5%' onClick={addToCart}> Add to Cart </Button>
        </Box>
      </Box>
    )
  }

    return (
          <Flex w='full' justify={'space-around'} gap='9' mt='20px'>
            {sellerChecker}
            {addToCartVerfication}
          </Flex>
    )
}

export default AddToCartComponent
