import React, { useEffect, useState } from "react";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button, Text, Flex, SimpleGrid, Link } from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import { getAllShoes } from "../../store/shoes";
import { fetchMostPopular } from "../../store/stockX";
import ShoeList from "../OldHomePage/ShoeList";
import { getLoadFilters, getclearFilters, setSelectedFilters } from "../../store/filters";

function NewHomePage() {
  const dispatch = useDispatch()
  const shoes = useSelector((state) => state.shoes)
  const shoesArray = Object.values(shoes)

  const sizeChart = [
    { id: 1, size: 3 },
    { id: 2, size: 3.5 },
    { id: 3, size: 4 },
    { id: 4, size: 4.5 },
    { id: 5, size: 5 },
    { id: 6, size: 5.5 },
    { id: 7, size: 6 },
    { id: 8, size: 6.5 },
    { id: 9, size: 7 },
    { id: 10, size: 7.5 },
    { id: 11, size: 8 },
    { id: 12, size: 8.5 },
    { id: 13, size: 9 },
    { id: 14, size: 9.5 },
    { id: 15, size: 10 },
    { id: 16, size: 10.5 },
    { id: 17, size: 11 },
    { id: 18, size: 11.5 },
    { id: 19, size: 12 },
    { id: 20, size: 12.5 },
    { id: 21, size: 13 },
    { id: 22, size: 13.5 },
    { id: 23, size: 14.5 },
    { id: 24, size: 15 },
  ]
  const brandsList = [
    { id: 1, title: "Yeezy" },
    { id: 2, title: "Air Jordan" },
    { id: 3, title: "Adidas" },
    { id: 4, title: "Nike" },
    { id: 5, title: "New Balance" },
    { id: 6, title: "Reebok" },
    { id: 7, title: "converse" },
    { id: 8, title: "Puma" },
    { id: 9, title: "vans" },
    { id: 10, title: "Collections" },
    { id: 11, title: "Designer" }
  ]

  const [filterBrand, setFilterBrand] = useState({ id: null, brand: null })
  const [filterShoeSize, setFilterShoeSize] = useState({ id: null, size: null })
  const [filterStyleType, setFilterStyleType] = useState({})
  const [filterPricing, setFilterPricing] = useState({})

  const updateFilterBrand = (filter) => { setFilterBrand({ id: filter.id, brand: filter.title }) };
  const updateFilterShoeSize = (filter) => { setFilterShoeSize({ id: filter.id, size: filter.size }) };
  //* Idea: change Pricing checkbox to buttons to allow only a single price to be selected instead of multiple
  const updateFilterStyle = (value) => { setFilterStyleType(value) };
  const updateFilterPricing = (value) => { setFilterPricing(value) };

  console.log("Pricing :", filterPricing)
  console.log(filterBrand)


  //* Create a payload that can be updated on every click/change for filters that will go to the store then update the redux state
  const payload = { brand: filterBrand.brand, size: filterShoeSize.size, style: filterStyleType, price: filterPricing }
  const filters = useSelector((state) => state.filters)

  useEffect(() => {
    dispatch(getAllShoes())
    dispatch(getLoadFilters(payload))
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(setSelectedFilters(payload))
    return data
  }

  const clearFilter = async (e) => {
    // e.preventDefault();
    const data = await dispatch(getclearFilters())
    return data
  }

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
            {brandsList.map((brand) => {
              return (
                <div key={brand.id}>
                  <Text
                    onClick={() => updateFilterBrand(brand)}
                    style={{
                      // backgroundColor: brand.title === filters.brand || brand.title === filterBrand.title ? "lightgray" : "", color: brand.id === filterBrand.id ? "white" : ""
                      backgroundColor: brand.title === filters.brand ? "red" : brand.title === filterBrand.brand ? "green" : ""

                    }}
                    textAlign={'left'} fontSize='24px' textTransform={"uppercase"} _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} >
                    {brand.title}</Text>

                </div>
              )
            })}
          </Box>

          <Box borderTop={'1px'}   >
            <Text fontSize='30px' position='relative' left='1%'>Shoe Style</Text>
            <VStack align={'start'} position='relative' left={'7.5%'} pb='3%' pt='2%' >
              <Text size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }}
                style={{
                  backgroundColor: filters.style === "men" ? "red" : filterStyleType === "men" ? "green" : ""
                }}
              ><Text onClick={() => updateFilterStyle("men")} fontSize={'20px'} textTransform='uppercase' >Men</Text></Text>
              <Text size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }}
                style={{
                  backgroundColor: filters.style === "woman" ? "red" : filterStyleType === "woman" ? "green" : ""
                }}
              ><Text onClick={() => updateFilterStyle("woman")} fontSize={'20px'} textTransform='uppercase' >Woman</Text></Text>
              <Text size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }}
                style={{
                  backgroundColor: filters.style === "youth" ? "red" : filterStyleType === "youth" ? "green" : ""
                }}
              ><Text onClick={() => updateFilterStyle("youth")} fontSize={'20px'} textTransform='uppercase'>Youth</Text></Text>
              <Text size={'lg'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }}
                style={{
                  backgroundColor: filters.style === "toddler" ? "red" : filterStyleType === "toddler" ? "green" : ""
                }}
              ><Text onClick={() => updateFilterStyle("toddler")} fontSize={'20px'} textTransform='uppercase'   >Toddler</Text></Text>
            </VStack>
          </Box>

          <Box borderTop={"1px"}  >
            <Text fontSize='30px' pl='2%'>Shoe Size</Text>
            <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacing='9px'>
                  {sizeChart.map((chart) => {
                    return (
                      <div key={chart.id}>
                        <Button w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                          key={chart.id}
                          onClick={() => updateFilterShoeSize(chart)}
                          style={{ backgroundColor: chart.id === filterShoeSize.id ? "black" : "", color: chart.id === filterShoeSize.id ? "white" : "" }}
                        > {chart.size}
                        </Button>
                      </div>
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
              <VStack columns={2} justifyContent={'center'} >
                <Text fontSize={'xl'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} onClick={() => updateFilterPricing("100")}
                  style={{
                    backgroundColor: filters.price === "100" ? "red" : filterPricing === "100" ? "green" : ""
                  }}
                >$100 & under</Text>
                <Text fontSize={'xl'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} onClick={() => updateFilterPricing("200-300")}
                  style={{
                    backgroundColor: filters.price === "200-300" ? "red" : filterPricing === "200-300" ? "green" : ""
                  }}
                >$200-300</Text>
                <Text fontSize={'xl'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} onClick={() => updateFilterPricing("300-400")}
                  style={{
                    backgroundColor: filters.price === "300-400" ? "red" : filterPricing === "300-400" ? "green" : ""
                  }}
                >$300-400</Text>
                <Text fontSize={'xl'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} onClick={() => updateFilterPricing("500-650")}
                  style={{
                    backgroundColor: filters.price === "500-650" ? "red" : filterPricing === "500-650" ? "green" : ""
                  }}
                >$500-650</Text>
                <Text fontSize={'xl'} w='100%' position='relative' right='6%' borderColor={'black'} colorScheme='red' _hover={{ color: "black", fontWeight: "600", bg: "gray.300" }} onClick={() => updateFilterPricing("650+")}
                  style={{
                    backgroundColor: filters.price === "650+" ? "red" : filterPricing === "650+" ? "green" : ""
                  }}
                >$650+</Text>
              </VStack>
            </Box>
          </Box>

          <Flex justify={'space-between'} paddingBottom={'2em'}>
            <Button
              bg={'gray.500'} border-radius='square' letterSpacing='0.35em' fontSize='0.7em' padding='0.9em 4em' w={'35%'}
              onClick={onSubmit}
            >
              Submit
            </Button>
            <Button
              bg={'gray.500'} border-radius='square' letterSpacing='0.35em' fontSize='0.7em' padding='0.9em 4em' w={'35%'} marginRight={'2em'}
              onClick={clearFilter}
            >
              Clear
            </Button>
          </Flex>
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
