import React, { useState, useEffect } from "react";
import { Grid, Center, GridItem, Box, VStack, StackDivider, Text, Flex } from '@chakra-ui/react'
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
        h='auto'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg='brown'
          h='100%'
        >
          <Center fontSize='30px' color='white'>
            Shoe Filters
          </Center>
        </GridItem>
        <GridItem rowSpan={2} colSpan={4} bg='gray'>
          <Center fontSize='30px' color='white'>
            All Shoe iterations
          </Center>
          <Wrap bg='black'pl='5px'>
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
