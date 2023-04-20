import React, {useEffect, useState} from "react";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button, Text, Flex, SimpleGrid, Link } from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import { getAllShoes, getOneShoe } from "../../store/shoeSlice";

import { fetchMostPopular } from "../../store/stockX";

import ShoeList from "../OldHomePage/ShoeList";

function NewHomePage() {

  const dispatch = useDispatch()
  const shoes = useSelector((state) => state.shoes)
  const shoesArray = Object.values(shoes)

  const sizeChart = [
    {id:1 , size: 3},
    {id:2 , size: 3.5},
    {id:3 , size: 4},
    {id:4 , size: 4.5},
    {id:5 , size: 5},
    {id:6 , size: 5.5},
    {id:7 , size: 6},
    {id:8 , size: 6.5},
    {id:9 , size: 7},
    {id:10, size: 7.5},
    {id:11, size: 8},
    {id:12, size: 8.5},
    {id:13, size: 9},
    {id:14, size: 9.5},
    {id:15, size: 10},
    {id:16, size: 10.5},
    {id:17, size: 11},
    {id:18, size: 11.5},
    {id:19, size: 12},
    {id:20, size: 12.5},
    {id:21, size: 13},
    {id:22, size: 13.5},
    {id:23, size: 14.5},
    {id:24, size: 15},
  ]
  const brandsList = [
    {id:1 , title: "Yeezy" },
    {id:2 , title: "Air Jordan"  },
    {id:3 , title: "Adidas"  },
    {id:4 , title: "Nike"  },
    {id:5 , title: "New Balance"  },
    {id:6 , title: "Reebok"  },
    {id:7 , title: "converse"  },
    {id:8 , title: "Puma"  },
    {id:9 , title: "vans"  },
    {id:10, title: "Collections"  },
    {id:11, title: "Designer"  }
  ]

  useEffect(()=>{
    dispatch(getAllShoes())
    // dispatch(getOneShoe(1))
},[dispatch])

const [isSize, setIsSize] = useState({id: 0 , size: 0});
const [selectedBrand , setBrandSelected] = useState(0)
const [selectedSize , setSizeSelected] = useState(0)

const handleBrandBg = (size) => {
  setBrandSelected(size.id);
};
const handleSizeBg = (size) => {
  setSizeSelected(size.id);
};

  return (
    <>
      <Grid
        pl='3px'
        pt="2%"
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        h='1150px'
        w='100%'
      >
        {/* Shoe Filter Nav */}
        <GridItem
          rowSpan={2}
          colSpan={1}

          overflowY={'scroll'}
          overflowX={'hidden'}
          w='75%'
          pl='2%'
          pr='5%'

        >

          <Box pl='1%' pt='5%' pb='2%'>
            {brandsList.map((brand) =>{
              return(
                <>
                <Text
                       key={1}
                       onClick={() => handleBrandBg(brand)}
                       style={{ backgroundColor: brand.id === selectedBrand ? "gray" : "",  color: brand.id === selectedBrand ? "white" : "" }}
                textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >{brand.title}</Text>
                  {/* <Link href={`/shoes/brands/:id`} _hover={{textDecoration: "none"}} > <Text textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >{brand.title}</Text> </Link> */}
                </>
              )
            })}
          </Box>

          <Box borderTop={'1px'}   >
            <Text fontSize='30px' position='relative' left='1%'>Shoe Style</Text>
            <VStack align={'start'} position='relative' left={'7.5%'} pb='3%' pt='2%' >
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} ><Text fontSize={'20px'} textTransform='uppercase' >Men</Text></Checkbox>
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} ><Text fontSize={'20px'} textTransform='uppercase' >Woman</Text></Checkbox>
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} ><Text fontSize={'20px'} textTransform='uppercase' >Child</Text></Checkbox>
              <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} ><Text fontSize={'20px'} textTransform='uppercase' >Toddler</Text></Checkbox>
            </VStack>
          </Box>

          <Box borderTop={"1px"}  >
            <Text fontSize='30px' pl='2%'>Shoe Size</Text>
            <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacing='9px'>
                  {sizeChart.map((chart) => {
                    return (
                      <>
                        <Button  w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                                     key={chart.id}
                                     onClick={() => handleSizeBg(chart)}
                                     style={{ backgroundColor: chart.id === selectedSize ? "red" : "",  color: chart.id === selectedSize ? "white" : "" }}
                                     > {chart.size}
                        </Button>
                      </>
                    )
                  })}
                </SimpleGrid>

              </Center>
            </Flex>
          </Box>

          <Box borderTop={'1px'} pb='27px'>
            <Text pl='2%' fontSize='30px' >Prices</Text>
            <Box position='relative' left={'7.5%'} pt='3%'>
              {/*  Checkbox styling : https://chakra-ui.com/docs/hooks/use-checkbox */}
              <VStack columns={2}  justifyContent={'center'} >
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} >$100 & under</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} >$200-300</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} >$300-400</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} >$500-650</Checkbox>
                <Checkbox size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600" }} >$650 +</Checkbox>
              </VStack>
            </Box>
          </Box>
        </GridItem>

        {/* Shoe Iteration col */}
        {/* <GridItem rowSpan={2} colSpan={4} minW={'100%'} overflow='scroll' mt='0.7%' > */}
        <GridItem rowSpan={2} colSpan={4} minW={'100%'} overflow='scroll' mt='0.7%' >
          <Wrap w='100%' minW={'100%'}>
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
