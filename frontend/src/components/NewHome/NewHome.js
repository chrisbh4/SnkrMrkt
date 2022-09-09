import React, {useState, useEffect} from "react";
import { Grid, Center, GridItem, Box, VStack, StackDivider, Text, Flex } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation/index";
import { getAllShoes } from "../../store/shoes";
import ShoeList from "../HomePage/ShoeList";

 function NewHomePage(){

    const dispatch = useDispatch()
    const shoes= useSelector((state)=> state.shoes)
    console.log("shoes :", shoes)
    const shoesArray = Object.values(shoes)

    useEffect(()=>{
        dispatch(getAllShoes())
    },[dispatch])


    return (
    <>


    <VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='stretch'
  py='5%'
>
  <Box h='40px' bg='yellow.200'>
    <Center>
    <Text fontSize="2xl">Just released</Text>

    </Center>
  </Box>
  <Box h='40px' bg='tomato'>
    <Center>
    <Text fontSize="2xl">Best Sellers</Text>
    </Center>
  </Box>
  <Box h='40px' bg='pink.100'>
    <Center>
    <Text fontSize={"2xl"}>Price Drops</Text>
    </Center>
  </Box>
  <Box h='40px' bg='blue.400'>
    <Center>
    <Text fontSize={"2xl"}>Best Sellers</Text>
    </Center>
  </Box>

  <Flex
    w="50%"
  >
  {shoesArray.map((shoe)=>{
                return(
                    <div className="shoe-container" key={shoe.id}>
                        <ShoeList shoe={shoe} key={shoe.id} />

                </div>
                )
    })}
  </Flex>
</VStack>
    </>)
}


export default NewHomePage;
