import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button,
        SimpleGrid,
        Flex,
        Center
 } from '@chakra-ui/react'; 

const ShoeStyleGrid = () => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const filters = useSelector((state) => state.filters)
  const [filterShoeSize, setFilterShoeSize] = useState({ id: null, size: null })

  const handleStyleClick = (style) => {
    setSelectedStyle(style);
  };

  const updateFilterShoeSize = (filter) => {
    if (filter.id === filterShoeSize.id) {
      setFilterShoeSize({});
    } else {
      setFilterShoeSize({ id: filter.id, size: filter.size });
    }
  };


  const youthSizeChart = [
    { id: 1, size: '3Y' },
    { id: 2, size: '3.5Y' },
    { id: 3, size: '4Y' },
    { id: 4, size: '4.5Y' },
    { id: 5, size: '5Y' },
    { id: 6, size: '5.5Y' },
    { id: 7, size: '6Y' },
    { id: 8, size: '6.5Y' },
    { id: 9, size: '7Y' },
    { id: 10, size: '7.5Y' },
    { id: 11, size: '8Y' },
    { id: 12, size: '8.5Y' },
    { id: 13, size: '9Y' },
  ];

  const womanSizeChart = [
    { id: 1, size: '5' },
    { id: 2, size: '5.5' },
    { id: 3, size: '6' },
    { id: 4, size: '6.5' },
    { id: 5, size: '7' },
    { id: 6, size: '7.5' },
    { id: 7, size: '8' },
    { id: 8, size: '8.5' },
    { id: 9, size: '9' },
    { id: 10, size: '9.5' },
    { id: 11, size: '10' },
    { id: 12, size: '10.5' },
    { id: 13, size: '11' },
    { id: 14, size: '11.5' },
    { id: 15, size: '12' },
    { id: 16, size: '12.5' },
    { id: 17, size: '13' },
    { id: 18, size: '13.5' },
    { id: 19, size: '14' },
    { id: 20, size: '14.5' },
    { id: 21, size: '15' },
  ];

  const menSizeChart = [
    { id: 1, size: '6' },
    { id: 2, size: '6.5' },
    { id: 3, size: '7' },
    { id: 4, size: '7.5' },
    { id: 5, size: '8' },
    { id: 6, size: '8.5' },
    { id: 7, size: '9' },
    { id: 8, size: '9.5' },
    { id: 9, size: '10' },
    { id: 10, size: '10.5' },
    { id: 11, size: '11' },
    { id: 12, size: '11.5' },
    { id: 13, size: '12' },
    { id: 14, size: '12.5' },
    { id: 15, size: '13' },
    { id: 16, size: '13.5' },
    { id: 17, size: '14' },
    { id: 18, size: '14.5' },
    { id: 19, size: '15' },
  ];

  const toddlerSizeChart = [
    { id: 1, size: '1T' },
    { id: 2, size: '2T' },
    { id: 3, size: '3T' },
    { id: 4, size: '4T' },
    { id: 5, size: '5T' },
    { id: 6, size: '6T' },
    { id: 7, size: '7T' },
    { id: 8, size: '8T' },
    { id: 9, size: '9T' },
    { id: 10, size: '10T' },
  ];

   
  const renderSizeChart = () => {
    if (selectedStyle === 'men') {
      return (
        <div>
                  <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacing='9px'>
                  {menSizeChart.map((chart) => {
                    return (
                      <div key={chart.id}>
                        <Button w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                          key={chart.id}
                          onClick={() => updateFilterShoeSize(chart)}
                          style={{
                            backgroundColor: filters.size === chart.size ? "red" : chart.id === filterShoeSize.id ? "green" : "",
                            color: chart.id === filterShoeSize.id ? "white" : ""
                          }}
                        > {chart.size}
                        </Button>
                      </div>
                    )
                  })}
                </SimpleGrid>

              </Center>
            </Flex>
        </div>
      );
    } else if (selectedStyle === 'women') {
      return (
        <div>
         <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacing='9px'>
                  {womanSizeChart.map((chart) => {
                    return (
                      <div key={chart.id}>
                        <Button w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                          key={chart.id}
                          onClick={() => updateFilterShoeSize(chart)}
                          style={{
                            backgroundColor: filters.size === chart.size ? "red" : chart.id === filterShoeSize.id ? "green" : "",
                            color: chart.id === filterShoeSize.id ? "white" : ""
                          }}
                        > {chart.size}
                        </Button>
                      </div>
                    )
                  })}
                </SimpleGrid>

              </Center>
            </Flex>
        </div>
      );
    } else if (selectedStyle === 'youth') {
      return (
        <div>
         <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacing='9px'>
                  {youthSizeChart.map((chart) => {
                    return (
                      <div key={chart.id}>
                        <Button w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                          key={chart.id}
                          onClick={() => updateFilterShoeSize(chart)}
                          style={{
                            backgroundColor: filters.size === chart.size ? "red" : chart.id === filterShoeSize.id ? "green" : "",
                            color: chart.id === filterShoeSize.id ? "white" : ""
                          }}
                        > {chart.size}
                        </Button>
                      </div>
                    )
                  })}
                </SimpleGrid>

              </Center>
            </Flex>
        </div>
      );
    } else if (selectedStyle === 'toddler') {
      return (
        <div>
         <Flex pl='2%'>
              <Center>
                <SimpleGrid columns={4} rows={5} pt='3%' pb='5%' spacing='9px'>
                  {toddlerSizeChart.map((chart) => {
                    return (
                      <div key={chart.id}>
                        <Button w='0%' bg='gray.400' _hover={{ bg: "gray.100", border: "2px" }}
                          key={chart.id}
                          onClick={() => updateFilterShoeSize(chart)}
                          style={{
                            backgroundColor: filters.size === chart.size ? "red" : chart.id === filterShoeSize.id ? "green" : "",
                            color: chart.id === filterShoeSize.id ? "white" : ""
                          }}
                        > {chart.size}
                        </Button>
                      </div>
                    )
                  })}
                </SimpleGrid>

              </Center>
            </Flex>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleStyleClick('men')}>Men</button>
        <button onClick={() => handleStyleClick('women')}>Women</button>
        <button onClick={() => handleStyleClick('youth')}>Youth</button>
        <button onClick={() => handleStyleClick('toddler')}>Toddler</button>
      </div>
      <div>
        {renderSizeChart()}
      </div>
    </div>
  );
};

export default ShoeStyleGrid;