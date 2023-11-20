import { Box, Center, Image, VStack, Link, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import '../OldHomePage/ShoeList.css'
import currency from 'currency.js'

function ShoeList ({ shoe }) {
  let imageCheck
  if (shoe.image.includes('jpg') || shoe.image.includes('jpeg') || shoe.image.includes('png') || shoe.image.includes('image')) {
    imageCheck = <Image src={shoe.image} alt={shoe.title} zIndex='inherit' />
  } else {
    imageCheck = <Image className='bad-image shoe-image' alt={shoe.title} />
  }

  return (
    <Box w='100%' pb='20px'>
      <Link _hover={{ textDecoration: 'none' }} href={`/shoes/${shoe.id}`}>
        <Center paddingBottom='10px'>
          {imageCheck}
        </Center>
        <Box w='100%' pl='4%' textAlign='left'>
          <Text w='100%' fontSize='15px' fontWeight='550'>{shoe.title}</Text>
          <Text w='100%' fontSize='15px' fontWeight='550'>{shoe.brand}</Text>
          <Text w='100%' fontSize='15px' fontWeight='550'>{currency(shoe.price).format()}</Text>
        </Box>
      </Link>
    </Box>
  )
}

export default ShoeList
