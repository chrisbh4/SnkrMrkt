import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchSneakers } from '../../store/stockX'
import {
  Input,
  List,
  ListItem,
  Box,
  Link,
  Image,
  Text,
  Flex,
  Spinner,
  useToast
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import debounce from 'lodash/debounce'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  const searchResults = useSelector((state) => state.stockXapi.searchResults)
  const searchTimeout = useRef(null)

  // Debounce the search to prevent too many API calls
  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (query.length < 2) return

      setIsLoading(true)
      try {
        await dispatch(searchSneakers(query))
      } catch (error) {
        toast({
          title: 'Search failed',
          description: 'Unable to fetch search results',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } finally {
        setIsLoading(false)
      }
    }, 500)
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleInputChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
    debouncedSearch(value)
  }

  const shouldShowResults = searchValue !== '' && searchResults?.length > 0

  return (
    <Box position='relative' width='100%' maxW='600px' mx='auto'>
      <Flex position='relative' alignItems='center'>
        <Input
          bg='white'
          type='text'
          value={searchValue}
          onChange={handleInputChange}
          placeholder='Search for sneakers...'
          size='lg'
          pl='40px'
          borderRadius='full'
        />
        <Box position='absolute' left='3' top='50%' transform='translateY(-50%)'>
          {isLoading ? (
            <Spinner size='sm' color='gray.500' />
          ) : (
            <SearchIcon color='gray.500' />
          )}
        </Box>
      </Flex>

      {shouldShowResults && (
        <Box
          position='absolute'
          width='100%'
          bg='white'
          boxShadow='lg'
          borderRadius='md'
          mt={2}
          maxH='400px'
          overflowY='auto'
          zIndex={1000}
        >
          <List spacing={0}>
            {searchResults.map((shoe) => (
              <Link
                key={shoe.styleID}
                href={`/shoes/${shoe.styleID}`}
                _hover={{ textDecoration: 'none' }}
              >
                <ListItem
                  p={3}
                  _hover={{ bg: 'gray.50' }}
                  borderBottom='1px'
                  borderColor='gray.100'
                >
                  <Flex align='center'>
                    <Image
                      src={shoe.thumbnail}
                      alt={shoe.shoeName}
                      boxSize='50px'
                      objectFit='contain'
                      mr={3}
                    />
                    <Box>
                      <Text fontWeight='medium'>{shoe.shoeName}</Text>
                      <Text fontSize='sm' color='gray.600'>
                        {shoe.brand} - ${shoe.lowestResellPrice?.stockX || 'N/A'}
                      </Text>
                    </Box>
                  </Flex>
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
