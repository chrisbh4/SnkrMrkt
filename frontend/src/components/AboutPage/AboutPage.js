import React, { useEffect } from 'react'
import './AboutPage.css'
import { useDispatch } from 'react-redux'
import { Text, Box, Grid, GridItem, Image, Link, Button, Heading, Container, VStack, AspectRatio} from '@chakra-ui/react'

function AboutPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getLoadCart())
  }, [dispatch])

  return (
    <>
      <Box w='100%' bg='white'>
        {/* <Box position='relative' overflow='hidden' bg='gray.900' pb={{ base: 16, sm: 20 }} pt={{ base: 14 }} bgImage="url('https://theplug-app-aws.s3.us-west-1.amazonaws.com/spalsh-page-background-img-2.png')"> */}
        <Box position='relative' overflow='hidden' bg='gray.900' pb={{ base: 16, sm: 20 }} pt={{ base: 14 }} >
          {/* <Image
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
          /> */}
            <video width="full" height="full" autoPlay opacity={"0.05"}>
              <source src='https://theplug-app-aws.s3.us-west-1.amazonaws.com/Screen+Recording+2024-07-11+at+12.03.55%E2%80%AFPM.mov' type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
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
                <Box
                  position='relative'
                  rounded='full'
                  px={3}
                  py={1}
                  textAlign='center'
                  textColor='gray.400'
                  fontSize='sm'
                  ring='1px'
                  ringColor='whiteAlpha.10'
                  _hover={{ ringColor: 'whiteAlpha.20' }}
                >
                  Announcing our next round of funding.{' '}
                  <Link href='#' fontWeight='semibold' color='white'>
                    <Box as='span' position='absolute' inset='0' aria-hidden='true' />
                    Read more <Box as='span' aria-hidden='true'>&rarr;</Box>
                  </Link>
                </Box>
              </Box>
              <Box textAlign='center'>
                <Heading as='h1' size='2xl' fontWeight='bold' color='white' lineHeight='tight' smSize='6xl'>
                  Deploy to the cloud with confidence
                </Heading>
                <Text mt={6} fontSize='lg' lineHeight='8' color='gray.300'>
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                </Text>
                <Box mt={10} display='flex' alignItems='center' justifyContent='center' gapX={6}>
                  <Button as='a' href='#' bg='indigo.500' color='white' px={3.5} py={2.5} fontSize='sm' fontWeight='semibold' shadow='sm' _hover={{ bg: 'indigo.400' }} _focus={{ outline: 'none', boxShadow: 'outline' }}>
                    Get started
                  </Button>
                  <Link href='#' fontSize='sm' fontWeight='semibold' color='white'>
                    Live demo <Box as='span' aria-hidden='true'>→</Box>
                  </Link>
                </Box>
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
            mt={10}
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
              <Image src='https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg' alt='Transistor' objectFit='contain' maxH={12} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://tailwindui.com/img/logos/158x48/reform-logo-white.svg' alt='Reform' objectFit='contain' maxH={12} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg' alt='Tuple' objectFit='contain' maxH={12} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg' alt='SavvyCal' objectFit='contain' maxH={12} w='full' />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
              <Image src='https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg' alt='Statamic' objectFit='contain' maxH={12} w='full' />
            </GridItem>
          </Grid>
        </Box>
        {/* Spacing for contaier */}
        <Box mt={{ base: '32', sm: '56' }}>
          <Container maxW='7xl' px={{ base: '6', lg: '8' }}>
            <Box maxW='2xl' mx='auto' textAlign={{ base: 'left', sm: 'center' }}>
              <Heading as='h2' fontSize='base' fontWeight='semibold' color='indigo.600'>
                Everything you need
              </Heading>
              <Text mt='2' fontSize={{ base: '3xl', sm: '4xl' }} fontWeight='bold' lineHeight='tight' color='gray.900'>
                No server? No problem.
              </Text>
              <Text mt='6' fontSize='lg' lineHeight='8' color='gray.600'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
              </Text>
            </Box>
          </Container>
          <Box pos='relative' overflow='hidden' pt='16'>
            <Container maxW='7xl' px={{ base: '6', lg: '8' }}>
              <Box pos='relative' mx='auto' mb='-12%' rounded='xl' shadow='2xl' borderWidth='1px'>
                {/* <img src='https://imgur.com/KOgkPYD.png' alt='App screenshot' width='2432' height='1442' /> */}
                <img src='https://tailwindui.com/img/component-images/project-app-screenshot.png' alt='App screenshot' width='2432' height='1442' />
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
            // gapX={{ base: '6', lg: '8' }}
            // gapY={{ base: '10', lg: '16' }}
            gap={10}
            textBase='base'
            leading='7'
            color='gray.600'
          >
            {/* Item 1 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdCloudDownload} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Push to deploy.
              </Text>
              <Text as='dd' display='inline' ml='6'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
              </Text>
            </GridItem>

            {/* Item 2 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdHttps} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                SSL certificates.
              </Text>
              <Text as='dd' display='inline' ml='6'>
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
              </Text>
            </GridItem>

            {/* Item 3 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdSettingsEthernet} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Simple queues.
              </Text>
              <Text as='dd' display='inline' ml='6'>
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
              </Text>
            </GridItem>

            {/* Item 4 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdSecurity} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Advanced security.
              </Text>
              <Text as='dd' display='inline' ml='6'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
              </Text>
            </GridItem>

            {/* Item 5 */}
            <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl='9' position='relative'>
              <Text as='dt' fontWeight='semibold' color='gray.900' display='inline'>
                {/* <Icon as={MdStorage} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
                Database backups.
              </Text>
              <Text as='dd' display='inline' ml='6'>
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Box position='relative' zIndex='10' mt={{ base: '32', sm: '56' }} bg='gray.900' pb={{ base: '20', sm: '24', xl: '0' }} />
        <Box w='full' h='auto' bg='black' display='flex' flexDirection={{ base: 'column', xl: 'row' }} alignItems='center' px='23em' py={{ base: '8', sm: '12', xl: '24' }}>
          <Box mt={{ base: '-8', xl: '0' }} w='full' maxW={{ base: '2xl', xl: '96' }} flex='none'>
            <Box position='relative' h='aspect-[2/1]' mx='-8' rounded='2xl' overflow='hidden' boxShadow='2xl' bg='gray.800'>
              <Image src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80' alt='' objectFit='cover' w='full' h='full' />
            </Box>
          </Box>
          <Box w='full' maxW={{ base: '2xl', xl: 'none' }} flex='auto' px={{ xl: '16' }} bg='rbg(59 130 246 / 0.5)'>
            <Box as='figure' w='full' position='relative' isolate pt={{ base: '6', sm: '12' }} ml='9em'>
              <Text as='blockquote' fontSize={{ base: 'xl', sm: '2xl' }} fontWeight='semibold' lineHeight={{ base: '8', sm: '9' }} color='white'>
                Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh scelerisque bibendum.
              </Text>
              <VStack mt='8' fontSize='xl' align='start'>
                <Text fontWeight='semibold' color='white'>Christian Brown</Text>
                <Text mt='1' color='gray.400'>CEO of Snkr Mrkt</Text>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AboutPage
