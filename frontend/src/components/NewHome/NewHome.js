import React, { useState, useEffect } from "react";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button, Text, Flex, SimpleGrid } from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation/index";
import { getAllShoes } from "../../store/shoes";
import ShoeList from "../HomePage/ShoeList";

function NewHomePage() {

  const dispatch = useDispatch()
  const shoes = useSelector((state) => state.shoes)
  console.log("shoes :", shoes)
  const shoesArray = Object.values(shoes)

  const shoeSizeChart = [1,1.5, 2,2.5, 3, 3.5,  4, 4.5,  5 , 5.5, 6, 6.5, 7 , 7.5, 8, 8.5, 9,9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]


  return (
    <>
      <Grid
        pt="2%"
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        // h='auto'
        h='1150px'
        overflow='scroll'
      >
        {/* Shoe Filter Nav */}
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg='brown'
          overflow={'scroll'}

        >

          <Box  pt='3%' pb='2%'>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Yeezy</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Air Jordan</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Adidas</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Nike</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >New Balance</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Reebok</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >converse</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >PUma</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >vans</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Collections</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Luxury Brands</Center>
            <Center fontSize='24px' color='white' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.200" }} >Other Brands</Center>
          </Box>

          <Box border={'solid'}   >
            <Center fontSize='30px' color='white'>Shoe Style</Center>
            <VStack align={'start'} position='relative' left={'40%'} pb='3%' pt='2%' >
              <Checkbox><Text fontSize={'20px'} textTransform='uppercase'>Men</Text></Checkbox>
              <Checkbox><Text fontSize={'20px'} textTransform='uppercase'>Woman</Text></Checkbox>
              <Checkbox><Text fontSize={'20px'} textTransform='uppercase'>Child</Text></Checkbox>
              <Checkbox><Text fontSize={'20px'} textTransform='uppercase'>Toddler</Text></Checkbox>
            </VStack>
          </Box>

          <Box border={"solid"}  >
            <Center fontSize='30px' color='white'>Shoe Size</Center>
            <Center>
            <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacingY='9px'>
              {shoeSizeChart.map((size) => {
                return (
                  <>
                      <Button w='0%' _hover={{bg: "gray.300"}}>{size}</Button>
                  </>
                )
              })}
            </SimpleGrid>

              </Center>
          </Box>

          <Box border={'solid'} pb='15px'>
            <Center fontSize='30px' color='white'>Prices</Center>
            <Center pt='3%'>
            <SimpleGrid columns={2}  spacingY='9px'justifyContent={'center'} >
              <Button w='90%' px={'9px'} _hover={{bg: "gray.300"}}   >$100 & under</Button>
              <Button w='90%' _hover={{bg: "gray.300"}} >$200-300</Button>
              <Button w='90%' _hover={{bg: "gray.300"}} >$300-400</Button>
              <Button w='90%' _hover={{bg: "gray.300"}} >$500-650</Button>
              <Button w='90%' _hover={{bg: "gray.300"}} >$650 +</Button>
            </SimpleGrid>
            </Center>
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
