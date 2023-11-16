import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";
import { DeleteIcon } from '@chakra-ui/icons'
import currency from "currency.js";
import {
    Button,
    Image,
    GridItem,
    SimpleGrid,
    Link,
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
        <SimpleGrid columns={5} alignContent='center' alignItems={'center'} rows={1} gap={6}>
            <GridItem w='100%' h='auto' >
                <Image src={item.img} borderRadius='full' boxSize='150px' ></Image>
            </GridItem>

            <GridItem w='100%' pos='relative' left='10%' textAlign={'center'} ><Link _hover={{ textDecoration: "none" }} href={`/shoes/${item.shoeId}`} >{item.title}</Link></GridItem>
            <GridItem w='100%' textAlign={'center'} >{currency(item.price).format()} </GridItem>
            <GridItem w='100%' textAlign={'center'} >Size: {item.size} </GridItem>
            <GridItem w='100%' >
                <Button onClick={removeShoe} bg='none' size={"sm"} fontSize='20px' fontWeight='bold' _hover={{ bg: "none" }}>
                    <DeleteIcon />
                </Button>
            </GridItem>
        </SimpleGrid>
    )
}



export default SlideOutCartItem;
