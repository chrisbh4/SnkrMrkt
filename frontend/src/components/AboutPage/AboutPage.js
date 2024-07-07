import React, { useEffect } from 'react'
import './AboutPage.css'
import { useDispatch } from 'react-redux'
import { Text, Box, Grid, GridItem, Image, Link, Button, Heading   } from '@chakra-ui/react'

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
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
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
    </Box>
    </>
  )
}

export default AboutPage
