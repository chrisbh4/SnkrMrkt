import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
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
        // <div className="cart-item-placement">
        // <div className="cart-item-grid">
        // <a href={`/shoes/${item.shoeId}`} >
        //         <img className="cart-item-image" src={item.img} alt="shoe" />
        //         </a>
        //         <h3 className="cart-item-title">{item.title}</h3>
        //         <h3 className="cart-item-shoeSize">Size: {item.size} (Mens)</h3>
        //         <h3 className="cart-item-price">Price: ${item.price}</h3>
        //         <button
        //             className="cart-remove-button"
        //             onClick={removeShoe} >
        //                 Remove Shoe
        //             </button>
        //     </div>
        // </div>
        <Box>
            <Flex w={'90%'} justify={'space-between'} alignItems={'center'}>
                <Image src={item.img} borderRadius='full' boxSize='150px' ></Image>
                <Box w={'30%'}>{item.title} </Box>
                <Box>${item.price}</Box>
                <Button onClick={removeShoe} bg='red.300' fontSize='20px' fontWeight='bold' _hover={{ bg: "black", textColor: "red", border: "2px" }}>X</Button>
            </Flex>
        </Box>
    )
}



export default CartItem;
