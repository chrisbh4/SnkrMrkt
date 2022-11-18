import React, { useState, useEffect } from 'react';
import { Link, useParams , useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import * as sessionActions from '../../../store/session';
import "./ShoeDetails.css"
import ShoeReviews from "../../Reviews/ShoeReviews/ShoeReviews"
import { getAllShoes } from "../../../store/shoes"
import { addShoeToCart } from "../../../store/shoppingCart"

import { Grid,
     Center,
     GridItem,
     Box,
     VStack,
     Checkbox,
     Button,
     Text,
     Flex,
     SimpleGrid,

     Input,
     Stack,
     Form,
     FormControl,
     FormLabel,
     FormErrorMessage,
     FormHelperText,
 } from '@chakra-ui/react'
import Navigation from "../../Navigation"

function DetailsTest(){


    return(
        <Box bg='gray.300' h='700px' >
          <Box bg='red.500' h='200px'>
            Title
          </Box>

          <Grid
  h='200px'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(4, 1fr)'

>
  <GridItem rowSpan={2} colSpan={2} bg='blue.400'>
    Images
  </GridItem>
  <GridItem colSpan={2} bg='tomato'>
    Size Bar
  </GridItem>
  <GridItem colSpan={1} bg='green.300'>
    Last Sold
  </GridItem>
  <GridItem colSpan={1} bg='papayawhip'>
    Checkout button
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
