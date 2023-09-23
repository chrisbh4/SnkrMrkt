import React, {useEffect} from "react";
import "./AboutPage.css"
import {getLoadCart} from "../../store/shoppingCart"
import { useDispatch } from "react-redux";
import { Text, Box, Center, Image } from "@chakra-ui/react";



function AboutPage() {
    const dispatch = useDispatch();

    useEffect(()=>{
        // dispatch(getLoadCart())
    }, [dispatch]);


    return (
        <div  className="splash-page-img">
            <div className="about-formatter">
                <div className="about-info-placement">
                    {/* <p className="about-info">
                This application is a clone based off the E-Commerce designer clothing/shoes store 'GOAT'.
                This site allows logged in users to buy or sell high-end designer shoes and also high end
                athletic shoes. All shoes sizes are dispalyed in mens until future features are added to where kids,woman, and men shoe sizes are available.
                Future features that plan to be added are Images for shoes and comments , personal user profile, shopping cart , user purchases, search bar , category filters
            </p> */}


                    <Center >
                        <Image src='https://imgur.com/KOgkPYD.png' ></Image>
                        <Text w={"50%"} fontSize={'2xl'} px={'1em'} >
                        Welcome to Snkr Mrkt! We are a team of sneaker enthusiasts who are passionate about bringing the best selection of exclusive sneakers to our customers.
                        Our goal is to provide a reliable and secure platform for sneakerheads to buy and sell their most sought-after sneakers.
                        With a focus on customer satisfaction, we strive to offer competitive prices and excellent customer service.
                        Thank you for choosing our website as your go-to destination for the latest and greatest sneakers.
                        </Text>

                    </Center>

                    <Box pt='1%'>

                    <div className="networking">
                        <p className="splash-name">Christian Brown</p>
                            <a href="https://www.linkedin.com/in/christian-brown-8770311ba/">
                                <i  class="splash-icon fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:Chrismbh4@gmail.com">
                                <i  class="splash-icon fas fa-envelope-square"></i>
                            </a>

                            <a href="https://github.com/chrisbh4">
                                <i  class="splash-icon fab fa-github"></i>
                        </a>
                    </div>
                    </Box>
                </div>

            </div>
        </div>
    )
}


export default AboutPage;
