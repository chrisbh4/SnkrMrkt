import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './ShoeDetails.css'
import AddToCartComponent from './AddToCartCompoent'
import CreateReviewModal from '../../Reviews/NewReview/ModalForm'
import EditReviewModal from '../../Reviews/EditReview/ModalForm'
import currency from 'currency.js'
import {
  Center,
  Box,
  Text,
  Flex,
  Image,
  Link,
  Grid
} from '@chakra-ui/react'
import { searchStockxApiDatabase } from '../../../store/stockX'
import { fetchMostPopular } from '../../../store/relatedProducts'

function StockxApiShoeDetail() {
  // const navigate = useNavigate();
  const dispatch = useDispatch()
  const params = useParams()
  const shoeId = params.id
  console.log(shoeId)

  // const getRandomDate = () => {
  //   const startDate = new Date('2018-05-20')
  //   const endDate = new Date('2022-12-25')
  //   const startTimestamp = startDate.getTime()
  //   const endTimestamp = endDate.getTime()
  //   const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp)
  //   const randomDate = new Date(randomTimestamp)
  //   const formattedDate = `${randomDate.getMonth() + 1}/${randomDate.getDate()}/${randomDate.getFullYear()}`

  //   return formattedDate
  // }


  // Function to generate 5 unique random numbers
  const stockxData = useSelector((state) => state.stockXapi)
  const relatedProducts = useSelector((state) => state.relatedProducts)
  console.log('relatedProducts', relatedProducts)
  // const cart = useSelector((state) => state.shoppingCart)

  useEffect(() => {
  if (!stockxData.styleID) {
    dispatch(searchStockxApiDatabase(shoeId)); // Replace with your action to fetch data
    dispatch(fetchMostPopular())
  }
}, [stockxData, shoeId, dispatch]);

  return (
    <Box px='15%' h='full' pb='20px'>
      <Box pl='10%'>
        <Box h='75px' pt='3'>
          <Text
            fontSize='4xl'
            pl='2px'
          > {stockxData?.shoeName}
          </Text>
        </Box>

        <Flex>
          <Box h='full' w='50%'>
            <Image
              src={stockxData?.thumbnail}
            />
          </Box>
          <Center w='45%'>
            <AddToCartComponent shoeId={stockxData?.styleID} />
          </Center>
        </Flex>

        <Box pb='3' pt='2'>
          <Flex fontWeight='bold' fontSize='lg'>
            <Box w='67%' h='10'>Product Details </Box>
            <Box w='full' h='10' pl='13%'>Product Description </Box>
          </Flex>
        </Box>

        <Flex fontSize={'xl'}>
          <Box w='40%'>
            <Flex justify='space-between' w='85%'>
              <Box>
                <Text>Style</Text>
                <Text>Colorway</Text>
                <Text>Retial Price</Text>
                <Text>Current Price</Text>
                <Text whiteSpace='nowrap'>Release Date</Text>
              </Box>

              <Box w={'50%'}>
                <Text whiteSpace='nowrap' >{stockxData?.silhoutte} </Text>
                <Text whiteSpace='nowrap' >{stockxData?.colorway} </Text>
                <Text>{currency(stockxData?.retailPrice).format()}</Text>
                <Text>{currency(stockxData?.lowestResellPrice?.stockX).format()}</Text>
                {/* Fix format Release Date format */}
                <Text>{stockxData?.releaseDate} </Text>
              </Box>
            </Flex>
          </Box>
          <Box w='50%' pb='5' pl='11%'>
            <Text fontSize='lg' w='full' fontWeight='semibold' overflow='scroll'>
              {stockxData?.description}
            </Text>
          </Box>

        </Flex>
        <Box borderTop='22px' borderColor='black' pt='1em'>
          <Text fontSize='2xl' fontWeight='bold'>Related Products</Text>
          {/* <Flex justify='space-between'>
            {relatedProducts.map(index => (
              <Box
                key={index}
                marginLeft='5px'
                _hover={{
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.5)'
                }}
              >
                <Link href={`/stockx/${index?.styleID}`}>
                  <Image
                    src={index?.thumbnail}
                    boxSize='300px'
                    p='3px'
                  />
                </Link>
              </Box>
            ))}
          </Flex> */}
        </Box>

        {/* Reviews */}
        <Box pb='3em'>
          <Text fontSize='2xl' fontWeight='bold' pt='2%'>{stockxData?.shoeName} Reviews</Text>
          <Box py='2%'>
            <CreateReviewModal />
          </Box>

          <Grid templateColumns='repeat(3, 1fr)' pb='1em' gap={6}>
            <Text ml='4%' fontSize='xl'>Reviews</Text>
            <Text ml='4%' fontSize='xl'>Ratings</Text>
          </Grid>

          {/* {stockxData?.Reviews.map((review) => {
            if (review.userId === userId) {
              return (
                <Grid templateColumns='repeat(3, 1fr)' gap={6} key={review.id}>
                  <Text ml='4%' pt='1em'>{review.comment}</Text>
                  <Text ml='2.5em' pt='1em'>{review.rating}</Text>
                  <EditReviewModal pt='3em' review={review} />
                </Grid>
              )
            }
            return (
              <Grid templateColumns='repeat(3, 1fr)' gap={6} key={review.id}>
                <Text ml='4%' pt='1em'>{review.comment}</Text>
                <Text ml='2.5em' pt='1em'>{review.rating}</Text>
              </Grid>
            )
          })} */}
        </Box>
      </Box>
    </Box>
  )
}

export default StockxApiShoeDetail
