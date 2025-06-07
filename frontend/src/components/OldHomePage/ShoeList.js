import { Box, Center, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchByExactName } from '../../store/stockX'
import '../OldHomePage/ShoeList.css'
import currency from 'currency.js'

function ShoeList ({ shoe }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let imageCheck
  if (shoe.image.includes('jpg') || shoe.image.includes('jpeg') || shoe.image.includes('png') || shoe.image.includes('image')) {
    imageCheck = <Image src={shoe.image} alt={shoe.title} zIndex='inherit' />
  } else {
    imageCheck = <Image className='bad-image shoe-image' alt={shoe.title} />
  }

  const handleClick = async (e) => {
    e.preventDefault()
    // Search for the shoe in sneaks.js API
    const styleId = await dispatch(searchByExactName(shoe.title))
    if (styleId) {
      navigate(`/sneaker/${styleId}`)
    } else {
      // Fallback to the original shoe details page if no match found
      navigate(`/shoes/${shoe.id}`)
    }
  }

  return (
    <Box w='100%' pb='20px'>
      <Box as="a" onClick={handleClick} cursor="pointer" _hover={{ textDecoration: 'none' }}>
        <Center paddingBottom='10px'>
          {imageCheck}
        </Center>
        <Box w='100%' pl='4%' textAlign='left'>
          <Text w='100%' fontSize='15px' fontWeight='550'>{shoe.title}</Text>
          <Text w='100%' fontSize='15px' fontWeight='550'>{shoe.brand}</Text>
          <Text w='100%' fontSize='15px' fontWeight='550'>{currency(shoe.price).format()}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ShoeList
