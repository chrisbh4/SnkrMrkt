import React, {useEffect, useState} from "react";
import { Grid, Center, GridItem, Box, VStack, Checkbox, Button, Text, Flex, SimpleGrid } from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import { getAllShoes } from "../../store/shoes";
import { fetchMostPopular } from "../../store/stockX";
import ShoeList from "../OldHomePage/ShoeList";
import { setSelectedFilters } from "../../store/filters";

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

  const [filterBrand , setFilterBrand] = useState({id: null, brand: null})
  const [filterShoeSize , setFilterShoeSize] = useState({id: null, size: null})
  const [filterStyleType, setFilterStyleType] = useState({id: null, style: null})
  const [filterPricing , setFilterPricing] = useState({})

  const updateFilterBrand = (filter) => { setFilterBrand({id: filter.id , brand: filter.title}) };
  const updateFilterShoeSize = (filter) => { setFilterShoeSize({id: filter.id, size: filter.size}) };
  //* Idea: change Pricing checkbox to buttons to allow only a single price to be selected instead of multiple
  const updateFilterPricing = (e) => { setFilterPricing(e.target.value)};
  const updateFilterStyle = (e) => { setFilterStyleType(e.target.value)};

  //* Create a payload that can be updated on every click/change for filters that will go to the store then update the redux state
  const payload = {brand: filterBrand.brand, size: filterShoeSize.size, style: filterStyleType.style, price: filterPricing}


  useEffect(()=>{
    dispatch(getAllShoes())
},[dispatch])

const onSubmit = async (e) => {
  e.preventDefault();
  const data = await dispatch(setSelectedFilters(payload))
  return data
}

  return (
    <>
        {/* Shoe Filter Nav */}


        {/* Shoe Iteration col */}
        {/* <GridItem rowSpan={2} colSpan={4} minW={'100%'} overflow='scroll' mt='0.7%' > */}
        <Box rowSpan={2} colSpan={4} minW={'100%'} w={"full"} overflow='scroll' mt='0.7%' >
          <Wrap w='100%' minW={'100%'} justify={'center'} bg={""}>
            {shoesArray.map((shoe) => {
              return (
                <WrapItem className="shoe-container" key={shoe.id} w={"24%"}>
                  <ShoeList shoe={shoe} key={shoe.id} />
                </WrapItem>
              )
            })}
          </Wrap>
        </Box>
    </>)
}


export default NewHomePage;
