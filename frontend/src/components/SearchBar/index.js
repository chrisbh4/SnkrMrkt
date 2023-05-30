import React, { useState } from 'react';
import { Input, List, ListItem, ListIcon, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Replace this dummy data with your actual data source
  const data = [
    { id: 1, title: 'Nike Air Max' },
    { id: 2, title: 'Adidas Ultraboost' },
    { id: 3, title: 'Puma Suede' },
    { id: 4, title: 'New Balance 574' },
    { id: 5, title: 'Vans Old Skool' },
  ];

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const shouldShowResults = searchValue !== '';

  return (
    <Box p={4} position="relative">
      <Input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
        mb={4}
        size="lg"
        variant="filled"
        leftIcon={<SearchIcon color="gray.500" />}
      />
      {shouldShowResults && (
        <Box
          position="absolute"
          width="100%"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          zIndex={1}
        >
          <List spacing={2}>
            {filteredData.map((item) => (
              <ListItem key={item.id}>
                <ListIcon as={SearchIcon} color="teal.500" />
                {item.title}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
