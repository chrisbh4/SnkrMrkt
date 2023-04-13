import React, {useEffect} from 'react';
import {  useParams} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import "./ShoeDetails.css"
import { getOneShoe } from "../../../store/shoes"

import AddToCartComponent from './AddToCartCompoent';
import {
  Center,
  Box,
  Text,
  Flex,
  Image,
  Link,
} from '@chakra-ui/react'

// * Something is dispathcing a data fetch on a parent & child compoent just need to find it

function ShoeDetialsChakra() {

  const dispatch = useDispatch();
  const params = useParams();

  const shoeId = params.id
  const shoe = useSelector((state) => state.shoes[shoeId])

    const stockXdata = useSelector((state) => state.stockXapi)
    const testData = stockXdata[0]

  useEffect(() => {
    dispatch(getOneShoe(shoeId))
  }, [shoeId]);




  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id
    }
    return 0.5;
  })


  //* Checks if Image string contains either jpeg, png, or image inside it's string
  let imageCheck;
  if (shoe?.image.includes("jpeg") || shoe?.image.includes("png") || shoe?.image.includes("image")) {
    imageCheck = <img src={shoe?.image} alt={shoe?.title}></img>
  } else {
    imageCheck = <img className="bad-image" alt={shoe?.title}></img>

  }


  return (
    <Box px={"15%"} h='full' bg='#f1e7e7' pb='20px' >
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
          <Flex  fontWeight={'bold'} fontSize='lg' >
            <Box w='67%'  h='10' >Product Detials </Box>
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


export default ShoeDetialsChakra;
