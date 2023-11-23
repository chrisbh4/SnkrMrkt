import React, { useState } from 'react'
import { Input, List, ListItem, ListIcon, Box, Link } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchBar = ({ shoes }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const data = Object.values(shoes)

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  const shouldShowResults = searchValue !== ''

  return (
    <Box position='relative' top='10px' left='40px'>
      <Input
        bg='white'
        type='text'
        value={searchValue}
        onChange={handleInputChange}
        placeholder='Search...'
        mb={4}
        size='lg'
        leftIcon={<SearchIcon color='gray.500' />}
      />
      {shouldShowResults && (
        <Box
          position='absolute'
          width='100%'
          bg='white'
          boxShadow='md'
          borderRadius='md'
          zIndex={1}
          py={2}
        >
          <List spacing={2}>
            {filteredData.map((item) => (
              <Link href={`/shoes/${item.id}`} _hover={{ textDecoration: 'none' }}>
                <ListItem key={item.id} _hover={{ bg: 'gray.200' }} fontSize='lg'>
                  <ListIcon as={SearchIcon} color='teal.500' />
                  {item.title}
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default SearchBar
