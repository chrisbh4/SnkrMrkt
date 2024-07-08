import React, { useEffect } from 'react'
import './AboutPage.css'
import { useDispatch } from 'react-redux'
import { Text, Box, Grid, GridItem, Image, Link, Button, Heading, Container, VStack   } from '@chakra-ui/react'

function AboutPage () {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getLoadCart())
  }, [dispatch])

  return (
    <>
    <Box w="100%" bg={"gray.300"}>
    <Box position="relative" overflow="hidden" bg="gray.900" pb={{ base: 16, sm: 20 }} pt={{ base: 14 }} bgImage={"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"}>
      <Image
        src="https://theplug-app-aws.s3.us-west-1.amazonaws.com/spalsh-page-background-img-2.png"
        alt=""
        position="absolute"
        inset="0"
        zIndex="-10"
        h="full"
        w="full"
        objectFit="cover"
      />
      <Box
        position="absolute"
        insetX="0"
        top={{ base: "-40", sm: "-80" }}
        zIndex="-10"
        transform="translateY(-50%) blur(3xl)"
        aria-hidden="true"
      >
        <Box
          position="relative"
          left={{ base: "calc(50% - 11rem)", sm: "calc(50% - 30rem)" }}
          w={{ base: "36.125rem", sm: "72.1875rem" }}
          transform="translateX(-50%) rotate(30deg)"
          bgGradient="linear(to-tr, #ff80b5, #9089fc)"
          opacity="0.2"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></Box>
      </Box>
      <Box maxW="7xl" mx="auto" px={{ base: 6, lg: 8 }}>
        <Box maxW="2xl" mx="auto" py={{ base: 32, sm: 48, lg: 56 }}>
          <Box display={{ base: "none", sm: "flex" }} mb={{ base: 0, sm: 8 }} justifyContent="center">
            <Box
              position="relative"
              rounded="full"
              px={3}
              py={1}
              textAlign="center"
              textColor="gray.400"
              fontSize="sm"
              ring="1px"
              ringColor="whiteAlpha.10"
              _hover={{ ringColor: "whiteAlpha.20" }}
            >
              Announcing our next round of funding.{" "}
              <Link href="#" fontWeight="semibold" color="white">
                <Box as="span" position="absolute" inset="0" aria-hidden="true"></Box>
                Read more <Box as="span" aria-hidden="true">&rarr;</Box>
              </Link>
            </Box>
          </Box>
          <Box textAlign="center">
            <Heading as="h1" size="2xl" fontWeight="bold" color="white" lineHeight="tight" smSize="6xl">
              Deploy to the cloud with confidence
            </Heading>
            <Text mt={6} fontSize="lg" lineHeight="8" color="gray.300">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </Text>
            <Box mt={10} display="flex" alignItems="center" justifyContent="center" gapX={6}>
              <Button as="a" href="#" bg="indigo.500" color="white" px={3.5} py={2.5} fontSize="sm" fontWeight="semibold" shadow="sm" _hover={{ bg: "indigo.400" }} _focus={{ outline: "none", boxShadow: "outline" }}>
                Get started
              </Button>
              <Link href="#" fontSize="sm" fontWeight="semibold" color="white">
                Live demo <Box as="span" aria-hidden="true">→</Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
        <Grid
        templateColumns="repeat(5, 1fr)"
        gap={8}
        w="full"
        mx="auto"
        alignItems="center"
        justifyContent="center"
        mt={10}
        mb={10}
        sm={{
          maxW: "xl",
          templateColumns: "repeat(6, 1fr)",
          gap: 10,
        }}
        lg={{
          maxW: "none",
          templateColumns: "repeat(5, 1fr)",
        }}
      >
        <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
          <Image src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg" alt="Transistor" objectFit="contain" maxH={12} w="full" />
        </GridItem>
        <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
          <Image src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg" alt="Reform" objectFit="contain" maxH={12} w="full" />
        </GridItem>
        <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
          <Image src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg" alt="Tuple" objectFit="contain" maxH={12} w="full" />
        </GridItem>
        <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
          <Image src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg" alt="SavvyCal" objectFit="contain" maxH={12} w="full" />
        </GridItem>
        <GridItem colSpan={{ base: 2, sm: 1, lg: 1 }}>
          <Image src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg" alt="Statamic" objectFit="contain" maxH={12} w="full" />
        </GridItem>
      </Grid>
    </Box>
    <Box mt={{ base: '32', sm: '56' }}>
    <Container maxW="7xl" px={{ base: '6', lg: '8' }}>
      <Box maxW="2xl" mx="auto" textAlign={{ base: 'left', sm: 'center' }}>
        <Heading as="h2" fontSize="base" fontWeight="semibold" color="indigo.600">
          Everything you need
        </Heading>
        <Text mt="2" fontSize={{ base: '3xl', sm: '4xl' }} fontWeight="bold" lineHeight="tight" color="gray.900">
          No server? No problem.
        </Text>
        <Text mt="6" fontSize="lg" lineHeight="8" color="gray.600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
        </Text>
      </Box>
    </Container>
    <Box pos="relative" overflow="hidden" pt="16">
        <Container maxW="7xl" px={{ base: '6', lg: '8' }}>
          <Box pos="relative" mx="auto" mb="-12%" rounded="xl" shadow="2xl" borderWidth="1px">
            <img src="https://tailwindui.com/img/component-images/project-app-screenshot.png" alt="App screenshot" width="2432" height="1442" />
            <Box pos="absolute" insetX="0" bottom="0" bgGradient="linear(to-t, white, transparent)" pt="7%" aria-hidden="true" />
          </Box>
        </Container>
      </Box>
    </Box>
    <Box mx="auto" mt={{ base: '16', sm: '20', md: '16' }} maxW="7xl" px={{ base: '6', lg: '8' }} pb={10} bg={"white"}>
    <Grid
      mx="auto"
      maxW={{ base: '2xl', sm: 'none', lg: 'none' }}
      templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
      // gapX={{ base: '6', lg: '8' }}
      // gapY={{ base: '10', lg: '16' }}
      gap={10}
      textBase="base"
      leading="7"
      color="gray.600"
    >
      {/* Item 1 */}
      <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl="9" position="relative">
        <Text as="dt" fontWeight="semibold" color="gray.900" display="inline">
          {/* <Icon as={MdCloudDownload} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
          Push to deploy.
        </Text>
        <Text as="dd" display="inline" ml="6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
        </Text>
      </GridItem>

      {/* Item 2 */}
      <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl="9" position="relative">
        <Text as="dt" fontWeight="semibold" color="gray.900" display="inline">
          {/* <Icon as={MdHttps} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
          SSL certificates.
        </Text>
        <Text as="dd" display="inline" ml="6">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
        </Text>
      </GridItem>

      {/* Item 3 */}
      <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl="9" position="relative">
        <Text as="dt" fontWeight="semibold" color="gray.900" display="inline">
          {/* <Icon as={MdSettingsEthernet} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
          Simple queues.
        </Text>
        <Text as="dd" display="inline" ml="6">
          Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
        </Text>
      </GridItem>

      {/* Item 4 */}
      <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl="9" position="relative">
        <Text as="dt" fontWeight="semibold" color="gray.900" display="inline">
          {/* <Icon as={MdSecurity} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
          Advanced security.
        </Text>
        <Text as="dd" display="inline" ml="6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
        </Text>
      </GridItem>

      {/* Item 5 */}
      <GridItem colSpan={{ base: '1', sm: '1', lg: '1' }} pl="9" position="relative">
        <Text as="dt" fontWeight="semibold" color="gray.900" display="inline">
          {/* <Icon as={MdStorage} boxSize="5" color="indigo.600" position="absolute" left="1" top="1" aria-hidden="true" /> */}
          Database backups.
        </Text>
        <Text as="dd" display="inline" ml="6">
          Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
        </Text>
      </GridItem>
    </Grid>
  </Box>
  <Box  position="relative" zIndex="10" mt={{ base: '32', sm: '56' }} bg="gray.900" pb={{ base: '20', sm: '24', xl: '0' }}>
    <Box position="absolute" inset="0" overflow="hidden" aria-hidden="true">
      <Box position="absolute" left="calc(50% - 19rem)" top="calc(50% - 36rem)" transform="blur(3px)">
        <Box
          w="68.5625rem"
          h="aspect-[1097/1023]"
          bgGradient="linear(to-r, #ff4694, #776fff)"
          opacity="0.25"
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
        />
      </Box>
    </Box>
    <Container mx="auto" display="flex" flexDirection={{ base: 'column', xl: 'row' }} alignItems="center" gapX={{ base: '8', xl: '10' }} gapY={{ base: '10', sm: '8', xl: '0' }} px={{ base: '6', lg: '8' }} py={{ base: '8', sm: '12', xl: '24' }}>
      {/* Left Section */}
      <Box mt={{ base: '-8', xl: '0' }} w="full" maxW={{ base: '2xl', xl: '96' }} flex="none">
        <Box position="relative" h="aspect-[2/1]" mx="-8" rounded="2xl" overflow="hidden" boxShadow="2xl" bg="gray.800">
          <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" objectFit="cover" w="full" h="full" />
        </Box>
      </Box>
      {/* Right Section */}
      <Box w="full" maxW={{ base: '2xl', xl: 'none' }} flex="auto" px={{ xl: '16' }}>
        <Box as="figure" position="relative" isolate pt={{ base: '6', sm: '12' }}>
          <svg viewBox="0 0 162 128" fill="none" aria-hidden="true" className="absolute left-0 top-0 -z-10 h-32 stroke-white/20">
            <path id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z" />
            <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86" />
          </svg>
          <Text as="blockquote" fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="semibold" lineHeight={{ base: '8', sm: '9' }} color="white">
            Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh scelerisque bibendum.
          </Text>
          <VStack mt="8" align="start">
            <Text fontWeight="semibold" color="white">Judith Black</Text>
            <Text mt="1" color="gray.400">CEO of Tuple</Text>
          </VStack>
        </Box>
      </Box>
    </Container>
  </Box>
    </Box>
    </>
  )
}

export default AboutPage
