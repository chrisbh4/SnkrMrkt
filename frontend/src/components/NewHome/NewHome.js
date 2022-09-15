import React, {useEffect} from "react";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button, Text, Flex, SimpleGrid } from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import { getAllShoes } from "../../store/shoes";

import ShoeList from "../HomePage/ShoeList";

function NewHomePage() {

  const dispatch = useDispatch()
  const shoes = useSelector((state) => state.shoes)
  console.log("shoes :", shoes)
  const shoesArray = Object.values(shoes)

  const shoeSizeChart = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]

  useEffect(()=>{
    dispatch(getAllShoes())
},[dispatch])

  return (
    <>
      <Grid
        pl='3px'
        pt="2%"
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'

        // h='auto'
        h='1150px'
        overflow='scroll'
      >
        {/* Shoe Filter Nav */}
        <GridItem
          rowSpan={2}
          colSpan={1}

          overflowY={'scroll'}
          overflowX={'hidden'}
          w='75%'
          pl='2%'

        >

          <Box pl='1%' pt='3%' pb='2%'>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Yeezy</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Air Jordan</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Adidas</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Nike</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >New Balance</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Reebok</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >converse</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >PUma</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >vans</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Collections</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Luxury Brands</Text>
            <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >Other Brands</Text>
          </Box>

          <Box borderTop={'2px'}   >
            <Text fontSize='30px' position='relative' left='1%'>Shoe Style</Text>
            <VStack align={'start'} position='relative' left={'7.5%'} pb='3%' pt='2%' >
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Text fontSize={'20px'} textTransform='uppercase' >Men</Text></Checkbox>
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Text fontSize={'20px'} textTransform='uppercase' >Woman</Text></Checkbox>
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Text fontSize={'20px'} textTransform='uppercase' >Child</Text></Checkbox>
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} ><Text fontSize={'20px'} textTransform='uppercase' >Toddler</Text></Checkbox>
            </VStack>
          </Box>

          <Box borderTop={"2px"}  >
            <Text fontSize='30px' pl='2%'>Shoe Size</Text>
            <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacingY='9px'>
                  {shoeSizeChart.map((size) => {
                    return (
                      <>
                        <Button w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}  >{size}</Button>
                      </>
                    )
                  })}
                </SimpleGrid>

              </Center>
            </Flex>
          </Box>

          <Box borderTop={'solid'} pb='15px'>
            <Text pl='2%' fontSize='30px' >Prices</Text>
            <Box position='relative' left={'7.5%'} pt='3%'>
              {/*  Checkbox styling : https://chakra-ui.com/docs/hooks/use-checkbox */}
              <VStack columns={2} spacingY='9px' justifyContent={'center'} >
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", bg: "gray.300" }} >$100 & under</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", bg: "gray.300" }} >$200-300</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", bg: "gray.300" }} >$300-400</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", bg: "gray.300" }} >$500-650</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", bg: "gray.300" }} >$650 +</Checkbox>
              </VStack>
            </Box>
          </Box>


        </GridItem>

        {/* Shoe Iteration col */}
        <GridItem rowSpan={2} colSpan={4} overflow='scroll'  >

          <Wrap >
            {shoesArray.map((shoe) => {
              return (
                <WrapItem className="shoe-container" key={shoe.id}>
                  <ShoeList shoe={shoe} key={shoe.id} />
                </WrapItem>
              )
            })}
          </Wrap>
        </GridItem>

      </Grid>
    </>)
}


export default NewHomePage;
