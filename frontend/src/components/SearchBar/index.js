import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Input, List, ListItem, ListIcon, Box, Link, Button, Flex } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { searchStockxApiDatabase } from '../../store/stockX'

const SearchBar = ({ shoes }) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  const dispatch = useDispatch()
  const data = Object.values(shoes)

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  const shouldShowResults = searchValue !== ''

  const onSubmit = async (e) => {
    e.preventDefault()
    if (searchValue) {
      let payload = searchValue
      //TODO: Set up page redirect if Submit status code is 200
      let data = await dispatch(searchStockxApiDatabase(payload))
      if (data){
        console.log("data :", data)
        //TODO: change this to /stockx/${data[0].styleID} : This will be the exclusive page for the API shoes
        navigate(`/shoes/${data.styleID}`)
        return data
      }

    }
    else {
      setErrors(data?.errors)
    }
    return data
  }


  return (
    <Flex position='relative' top='10px' left='40px' w={'full'}>
      {/* <Box position='relative' top='10px' left='40px'> */}
      <Box>
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
                <Link href={`/shoes/${item.id}`} _hover={{ textDecoration: 'none' }} key={item.id}>
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
      <Button onClick={onSubmit}>Search</Button>
    </Flex>
  )
}

export default SearchBar
