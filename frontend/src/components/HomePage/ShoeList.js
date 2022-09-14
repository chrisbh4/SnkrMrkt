import { Box, Center, Image, VStack, Link } from "@chakra-ui/react";
import React from "react";
// import { useDispatch } from "react-redux";
// import { getAllShoes } from "../../store/shoes";
import '../HomePage/ShoeList.css'


function ShoeList({ shoe }) {

    let imageCheck;
    if (shoe.image.includes("jpg") || shoe.image.includes("jpeg") || shoe.image.includes("png") || shoe.image.includes("image")) {
        imageCheck = <Image src={shoe.image} alt={shoe.title}></Image>
    } else {
        imageCheck = <Image className="bad-image shoe-image" alt={shoe.title}></Image>

    }

    return (
        <VStack w='100%' pb='20px'>
            <Link _hover={{textDecoration: "none"}} href={`/shoes/${shoe.id}`} >
                <Center paddingBottom={'10px'} >
                    {imageCheck}
                </Center  >
                <Center w='100%' fontSize={'15px'} fontWeight='550' >{shoe.title}</Center>
                <Center w='100%' fontSize={'15px'} fontWeight='550' >{shoe.brand}</Center>
            </Link>
        </VStack>
    )
}


export default ShoeList
