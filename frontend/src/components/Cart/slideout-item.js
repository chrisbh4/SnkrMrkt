import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";


import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    Image,
    Grid,
    GridItem,
    useDisclosure,
    SimpleGrid,
    Link,
    Box,
    Center
} from '@chakra-ui/react'



function SlideOutCartItem({ item }) {
    const dispatch = useDispatch();

    //Built out cart and destructure the item thats being passed in as a prop
    const cart = useSelector((state) => state.shoppingCart)

    //Needs to be in a function to be able to useDispatch inside the store
    const removeShoe = async () => {
        await dispatch(removeShoeFromCart(item.shoeId, cart))
        return
    }


    return (
        <SimpleGrid columns={4} alignContent='center' alignItems={'center'} rows={1} gap={6}>
            <GridItem w='100%' h='auto' >
                <Image src={item.img} borderRadius='full' boxSize='150px' ></Image>
            </GridItem>

            <GridItem w='100%' pos='relative' left='10%' textAlign={'center'} ><Link _hover={{ textDecoration: "none" }} href={`/shoes/${item.shoeId}`} >{item.title}</Link></GridItem>
            <GridItem w='100%' textAlign={'center'} >{item.price} </GridItem>
            <GridItem w='100%' textAlign={'center'} >
                <Button onClick={removeShoe} bg='red.300' fontSize='20px' fontWeight='bold' _hover={{ bg: "black", textColor: "red", border: "2px" }}>X</Button>
            </GridItem>
        </SimpleGrid>
    )
}



export default SlideOutCartItem;
