import React, { useState, useEffect } from "react";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button } from '@chakra-ui/react'
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

  useEffect(() => {
    dispatch(getAllShoes())
  }, [dispatch])


  return (
    <>
      <Grid
        pt="4%"
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
          <Center fontSize='30px' color='white'>
            Shoe Filters
          </Center>
          <Box border={'solid'}>
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
            <VStack align={'start'} position='relative' left={'40%'} >
              <Checkbox>Men</Checkbox>
              <Checkbox>woman</Checkbox>
              <Checkbox>Child</Checkbox>
              <Checkbox>toddler</Checkbox>
            </VStack>
          </Box>

          <VStack border={"solid"}  >
          <Center fontSize='30px' color='white'>Shoe Size</Center>
                <Button>6.5</Button>
                <Button>7</Button>
                <Button>7.5</Button>
                <Button>8</Button>

          </VStack>

          <Box border={'solid'} pb='15px'>
            <Center fontSize='30px' color='white'>Prices</Center>
            <VStack >
              <Button px='4px' >$100 & under</Button>
              <Button>$200-300</Button>
              <Button>$300-400</Button>
              <Button>$500-650</Button>
              <Button>$650 +</Button>
            </VStack>
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
