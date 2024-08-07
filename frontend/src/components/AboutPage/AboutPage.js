import React, { useEffect } from 'react'
import './AboutPage.css'
import { useDispatch } from 'react-redux'
import { Text, Box, Grid, GridItem, Image, Heading, Container } from '@chakra-ui/react'

function AboutPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getLoadCart())
  }, [dispatch])

  return (
    <>
      <Box w='100%' bg='white'>
        <Box position='relative' overflow='hidden' bg='gray.900' pb={{ base: 16, sm: 20 }} >
          <Image
            src='https://imgur.com/KOgkPYD.png'
            // src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/spalsh-page-background-img-2.png'
            alt=''
            position='absolute'
            inset='0'
            zIndex='1'
            h='full'
            w='full'
            objectFit='cover'
            opacity={0.05}
          />
          <Box
            position='absolute'
            insetX='0'
            top={{ base: '-40', sm: '-80' }}
            zIndex='-10'
            transform='translateY(-50%) blur(3xl)'
            aria-hidden='true'
          >
            <Box
              position='relative'
              left={{ base: 'calc(50% - 11rem)', sm: 'calc(50% - 30rem)' }}
              w={{ base: '36.125rem', sm: '72.1875rem' }}
              transform='translateX(-50%) rotate(30deg)'
              bgGradient='linear(to-tr, #ff80b5, #9089fc)'
              opacity='0.2'
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </Box>
          <Box maxW='7xl' mx='auto' px={{ base: 6, lg: 8 }}>
            <Box maxW='2xl' mx='auto' py={{ base: 32, sm: 48, lg: 56 }}>
              <Box display={{ base: 'none', sm: 'flex' }} mb={{ base: 0, sm: 8 }} justifyContent='center'>
              </Box>
              <Box textAlign='center'>
                <Heading as='h1' size='2xl' fontWeight='bold' color='white' lineHeight='tight' smSize='6xl'>
                  SNKR MRKT
                </Heading>
                <Heading as='h1' size='xl' fontWeight='bold' color='white' lineHeight='tight' smSize='6xl'>
                Elevate Your Sneaker Game
                  {/* the premier destination for selling and buying exclusive sneakers */}
                </Heading>
                <Text mt={6} fontSize='lg' lineHeight='8' color='gray.300'>
                Welcome to Snkr Mrkt, the ultimate destination for high-valued sneakers and shoes. We cater to sneaker enthusiasts, collectors, and anyone who appreciates the artistry and craftsmanship of premium footwear. At Snkr Mrkt, you'll find the rarest, most coveted sneakers that define style and status.
                </Text>
                <Box display='flex' alignItems='center' justifyContent='center' gapX={6}></Box>
              </Box>
            </Box>
          </Box>
          <Grid
            templateColumns='repeat(5, 1fr)'
            gap={8}
            w='full'
            mx='auto'
            alignItems='center'
            justifyContent='center'
            mb={10}
            sm={{
              maxW: 'xl',
              templateColumns: 'repeat(6, 1fr)',
              gap: 10
            }}
            lg={{
              maxW: 'none',
              templateColumns: 'repeat(5, 1fr)'
            }}
          >
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/002_nike-logos-swoosh-white.png' alt='Transistor' objectFit='contain' maxH={24} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Text color='white' textAlign={'center'} fontSize={'5xl'} fontWeight={'extrabold'}>YEEZY</Text>
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/006_nike-logos-jordan-white.png' alt='Reform' objectFit='contain' maxH={32} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/004_nike-logos-converse-white.png' alt='Tuple' objectFit='contain' maxH={28} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/adidas-logo-png-adidas-icon-transparent-png_19766239.png' alt='Tuple' objectFit='contain' maxH={32} w='full' />
            </GridItem>
          </Grid>
        </Box>
        <video width="full" height="full" autoPlay muted loop>
          <source src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/landing-page-video.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Spacing for contaier */}
        <Box mt={{ base: '32', sm: '24' }}>
          <Container maxW='7xl' px={{ base: '6', lg: '8' }}>
            <Box maxW='2xl' mx='auto' textAlign={{ base: 'left', sm: 'center' }}>
              <Text mt='2' fontSize={{ base: '3xl', sm: '4xl' }} fontWeight='bold' lineHeight='tight' color='gray.900'>
                No sneakers? No problem.
              </Text>
              <Text mt='6' fontSize='lg' lineHeight='8' color='gray.600'>
              Explore our collection, find your grail, and elevate your sneaker game today. At Snkr Mrkt, your next great find is just a click away.
              </Text>
            </Box>
          </Container>
          <Box pos='relative' overflow='hidden' pt='16'>
            <Container maxW='7xl' maxH={'lg'} px={{ base: '6', lg: '8' }}>
              <Box pos='relative' mx='auto' mb='-12%' rounded='xl' shadow='2xl' borderWidth='1px' rotate={'45'}>
                <img src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/landing-page-img.png' alt='App screenshot' />
                <Box pos='absolute' insetX='0' bottom='0' bgGradient='linear(to-t, white, transparent)' pt='7%' aria-hidden='true' />
              </Box>
            </Container>
          </Box>
        </Box>
        <Box mx='auto' mt={{ base: '16', sm: '20', md: '16' }} maxW='7xl' px={{ base: '6', lg: '8' }} pb={10}>
          <Grid
            mx='auto'
            maxW={{ base: '2xl', sm: 'none', lg: 'none' }}
            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={10}
            textBase='base'
            leading='7'
            color='gray.600'
          >
            {/* Item 1 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdCloudDownload} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Exclusive Drops:
              </Text>
              <Text as='dd' display='inline' ml='1'>
               Stay ahead with limited edition releases and rare finds that you won't see anywhere else.
              </Text>
            </GridItem>

            {/* Item 2 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdHttps} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Designer Collaborations:
              </Text>
              <Text as='dd' display='inline' ml='1'>
               Discover unique pieces born from the collaboration between top designers and leading brands.
              </Text>
            </GridItem>

            {/* Item 3 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdSettingsEthernet} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Vintage Classics:
              </Text>
              <Text as='dd' display='inline' ml='1'>
               Relive the glory days with our selection of vintage and retro sneakers that have stood the test of time.
              </Text>
            </GridItem>

            {/* Item 4 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdSecurity} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                High-End Footwear:
              </Text>
              <Text as='dd' display='inline' ml='1'>
               Step into luxury with our curated range of high-end shoes, crafted with the finest materials and unparalleled attention to detail.
              </Text>
            </GridItem>

            {/* Item 5 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdStorage} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Authenticity Guaranteed:
              </Text>
              <Text as='dd' display='inline' ml='1'>
               Every pair we sell is 100% authentic, verified by our team of experts.
              </Text>
            </GridItem>
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdStorage} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Community Driven:
              </Text>
              <Text as='dd' display='inline' ml='1'>
               Join a community of like-minded sneakerheads and collectors. Share your passion, discover new trends, and stay updated with the latest sneaker news.
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Box pb={'20'}></Box>
        {/* <Box position='relative' zIndex='10' mt={{ base: '32', sm: '56' }} bg='gray.900' pb={{ base: '20', sm: '24', xl: '0' }} /> */}
        {/* <Box w='full' h='auto' bg='black' display='flex' flexDirection={{ base: 'column', xl: 'row' }} alignItems='center' px='23em' py={{ base: '8', sm: '12', xl: '24' }}>
          <Box mt={{ base: '-8', xl: '0' }} w='full' maxW={{ base: '2xl', xl: '96' }} flex='none'>
            <Box position='relative' h='aspect-[2/1]' mx='-8' rounded='2xl' overflow='hidden' boxShadow='2xl' bg='gray.800'>
              <Image src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80' alt='' objectFit='cover' w='full' h='full' />
            </Box>
          </Box>
          <Box w='full' maxW={{ base: '2xl', xl: 'none' }} flex='auto' px={{ xl: '16' }} bg='rbg(59 130 246 / 0.5)'>
            <Box as='figure' w='full' position='relative' isolate pt={{ base: '6', sm: '12' }} ml='9em'>
              <Text as='blockquote' fontSize={{ base: 'xl', sm: '2xl' }} fontWeight='semibold' lineHeight={{ base: '8', sm: '9' }} color='white'>
              Our mission is to provide you with the highest quality sneakers and shoes, carefully curated to meet the discerning tastes of collectors and enthusiasts like you. We understand the thrill of the hunt for that perfect pair, the excitement of unboxing a new addition, and the pride in showcasing a collection that reflects your personal style.
              </Text>
              <VStack mt='8' fontSize='xl' align='start'>
                <Text fontWeight='semibold' color='white'>Christian Brown</Text>
                <Text mt='1' color='gray.400'>CEO of Snkr Mrkt</Text>
              </VStack>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </>
  )
}

export default AboutPage
