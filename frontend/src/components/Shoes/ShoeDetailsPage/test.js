import React, { useEffect } from "react"
import { Link, useParams , useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
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

function DetailsTest(){

    return(
        <Box  h='full'>
        <Grid
        pt='80px'
  templateAreas={`"title title title"
                  "image sizes sizes"
                  "image last-sold checkout"
                  "related related related"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='full'
  gap='1'
  color='blackAlpha.700'
  fontWeight='bold'
>
  <GridItem pl='2' bg='orange.300' area={'title'}>
    Title
  </GridItem>
  <GridItem pl='2' bg='pink.300' area={'image'}>
    Image
  </GridItem>
  <GridItem pl='2' bg='green.300' area={'sizes'}>
    Size bar
  </GridItem>
  <GridItem pl='2' bg='blue.300' area={'last-sold'}>
    Last Sold
  </GridItem>
  <GridItem pl='2' bg='gray.400' area={'checkout'}>
        Checkout container
  </GridItem>
  <GridItem pl='2' bg='red.300' area={'related'}>
        Related Prodcuts
  </GridItem>
  <GridItem pl='2' bg='blue.300' area={'details'}>
        Description / Details
  </GridItem>
</Grid>
        </Box>
    )
}


export default DetailsTest;
