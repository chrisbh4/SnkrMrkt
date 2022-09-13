import React, { useState, useEffect } from "react";
import { Grid, Center, GridItem, Box, VStack, StackDivider, Text, Flex } from '@chakra-ui/react'
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
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        py='5%'>

        <Box h="20%" bg='yellow.200'>
          <VStack>
            <Text fontSize="2xl">Just released</Text>
            <Flex
              w="100%"
              overflow="scroll" >
              {shoesArray.map((shoe) => {
                return (
                  <div className="shoe-container" key={shoe.id}>
                    <ShoeList shoe={shoe} key={shoe.id} />
                  </div>
                )
              })}
            </Flex>
          </VStack>
        </Box>

        <Box  bg='tomato'   >
          <VStack>
            <Text fontSize="2xl">Most Popular</Text>
            <Flex
              w="100%"
              overflow="scroll" >
              {shoesArray.map((shoe) => {
                return (
                  <div className="shoe-container" key={shoe.id}>
                    <ShoeList shoe={shoe} key={shoe.id} />
                  </div>
                )
              })}
            </Flex>
          </VStack>
        </Box>

        <Box  bg='blue.400'>
          <VStack>
            <Text fontSize={"2xl"}>Best Sellers</Text>
            <Flex
              w="100%"
              overflow="scroll" >
              {shoesArray.map((shoe) => {
                return (
                  <div className="shoe-container" key={shoe.id}>
                    <ShoeList shoe={shoe} key={shoe.id} />
                  </div>
                )
              })}
            </Flex>
          </VStack>
        </Box>

        <Box  bg='pink.100'>
          <VStack>
            <Text fontSize={"2xl"}>Brands</Text>
            <Flex
              w="100%"
              overflow="scroll" >
              {shoesArray.map((shoe) => {
                return (
                  <div className="shoe-container" key={shoe.id}>
                    <ShoeList shoe={shoe} key={shoe.id} />
                  </div>
                )
              })}
            </Flex>
          </VStack>
        </Box>



      </VStack>
    </>)
}


export default NewHomePage;
