import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import "./ShoeDetails.css"
import { getOneShoe } from "../../../store/shoes"
// import { addShoeToCart } from "../../../store/shoppingCart"
// import { fetchMostPopular } from '../../../store/stockX';
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
    // dispatch(fetchMostPopular())
  }, [dispatch, shoeId]);


  const getRandomRetialPrice =() => {
    const randomNumber = Math.random() < 0.5 ? 180 : 220;
    return randomNumber;
}

const getRandomDate = () => {
  const startDate = new Date('2018-05-20');
  const endDate = new Date('2022-12-25');
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp);
  const randomDate = new Date(randomTimestamp);
  const formattedDate = `${randomDate.getMonth() + 1}/${randomDate.getDate()}/${randomDate.getFullYear()}`;

  return formattedDate;
}

  // const stockXdata = useSelector((state) => state.stockXapi)
  // const testData = stockXdata[0]

  // Function to generate 5 unique random numbers
  const allShoes = Object.values(useSelector((state) => state.shoes))

  function generateRandomShoes() {
    let randomNumbers = [];
    if (allShoes.length > 0) {
      while (randomNumbers.length < 4) {
        let num = Math.floor(Math.random() * Object.values(allShoes).length);
        if (!randomNumbers.includes(num)) {
          randomNumbers.push(num);
        }
      }
    }
    return randomNumbers;
  }

  // // Generate the random numbers
  const randomShoeIndices = generateRandomShoes();
  // const randomShoeIndices = [];


  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user?.id
    }
    return 0.5;
  })

  const shoe = useSelector((state) => state.shoes[shoeId])

  // const cart = useSelector((state) => state.shoppingCart)

  //* Checks if Image string contains either jpeg, png, or image inside it's string
  // let imageCheck;
  // if (shoe?.image.includes("jpeg") || shoe?.image.includes("png") || shoe?.image.includes("image")) {
  //   imageCheck = <img src={shoe?.image} alt={shoe?.title}></img>
  // } else {
  //   imageCheck = <img className="bad-image" alt={shoe?.title}></img>
  // }

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
            <Box w='67%' h='10' >Product Details </Box>
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
                {/* <Text whiteSpace={'nowrap'} >{testData?.details.type} </Text> */}
                <Text whiteSpace={'nowrap'} >Lorem ipsum dolor </Text>

                {/* <Text whiteSpace={'nowrap'} >{testData?.details.colorway} </Text> */}
                <Text whiteSpace={'nowrap'} >dolor um Lorem  </Text>

                {/* <Text>${testData?.details.retail} </Text> */}
                <Text>${getRandomRetialPrice()}</Text>

                {/* <Text>{testData?.details.releaseDate} </Text> */}
                <Text>{getRandomDate()} </Text>
              </Box>
            </Flex>
          </Box>
          <Box w='50%' pb='5' pl='11%'>
            <Text fontSize={'lg'} w='full' h='200px' fontWeight='semibold' overflow={'scroll'} >
              {shoe?.description}
              {/* {testData?.details.description} */}
            </Text>
          </Box>


        </Flex>
        <Box borderTop={'22px'} borderColor='black' pt={'1em'} >
          <Text fontSize={'2xl'} fontWeight='bold' >Related Products</Text>
          <Flex justify={'space-between'}>
            {randomShoeIndices.map(index => (
              <Box
                marginLeft={'5px'}
                _hover={{
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.5)"
                }}
              >
                <Link href={`/shoes/${index}`}>
                  <Image
                    src={allShoes[index]?.image}
                    boxSize='300px'
                    p={'3px'}
                  />
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Reviews */}
        <Box pb={'3em'}>
          <Text fontSize={'2xl'} fontWeight='bold' pt={"2%"} >{shoe?.title} Reviews</Text>
          <Box py={"2%"}>
            <CreateReviewModal />
          </Box>

          <Grid templateColumns={"repeat(3, 1fr)"} pb={'1em'} gap={6}>
            <Text ml={"4%"} fontSize={'xl'} >Reviews</Text>
            <Text ml={"4%"} fontSize={'xl'} >Ratings</Text>
          </Grid>
          
          {shoe?.Reviews.map((review) => {
            if (review.userId === userId) {
              return (
                <Grid templateColumns={"repeat(3, 1fr)"} gap={6}>
                  <Text ml={"4%"} pt={'1em'}>{review.comment}</Text>
                  <Text ml={"2.5em"} pt={'1em'}>{review.rating}</Text>
                  <EditReviewModal pt={'3em'} review={review} />
                </Grid>
              )
            }
            return (
              <Grid templateColumns={"repeat(3, 1fr)"} gap={6}>
                <Text ml={"4%"} pt={'1em'} >{review.comment}</Text>
                <Text ml={"2.5em"} pt={'1em'} >{review.rating}</Text>
              </Grid>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}


export default ShoeDetialsChakra;
