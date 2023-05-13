import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    Heading,
    Text,
    Grid,
    Flex,
    Button,
    Textarea,
    Center,
    Image,
    Checkbox,
    Select,
    border,
    VStack,
    Stack,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'





function CartItem({item}){
    const dispatch = useDispatch();

//Built out cart and destructure the item thats being passed in as a prop
    const cart = useSelector((state)=> state.shoppingCart)

//Needs to be in a function to be able to useDispatch inside the store
    const removeShoe = async()=>{
        await dispatch(removeShoeFromCart(item.shoeId,cart))
        return
    }


    return(
        <Box>
            <Flex w={'90%'} justify={'space-between'} alignItems={'center'}>
                <Image src={item.img} borderRadius='full' boxSize='150px' ></Image>
                <Box w={'30%'}>{item.title} </Box>
                <Box>${item.price}</Box>
                <Button onClick={removeShoe} bg='none' fontSize='20px' fontWeight='bold' _hover={{ bg: "none" }}>
                    <DeleteIcon />
                </Button>
            </Flex>
        </Box>
    )
}



export default CartItem;
