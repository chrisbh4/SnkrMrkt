import React, {useEffect} from "react";
import "./AboutPage.css"
import {getLoadCart} from "../../store/shoppingCart"
import { useDispatch } from "react-redux";




function AboutPage() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getLoadCart())
    }, [dispatch]);


    return (
        <div  class='bg-red-500'>
            <div className="about-formatter">
                <div className="about-info-placement">
                    <h1 className="about-title">The Plug</h1>
                    {/* <p className="about-info">
                This application is a clone based off the E-Commerce designer clothing/shoes store 'GOAT'.
                This site allows logged in users to buy or sell high-end designer shoes and also high end
                athletic shoes. All shoes sizes are dispalyed in mens until future features are added to where kids,woman, and men shoe sizes are available.
                Future features that plan to be added are Images for shoes and comments , personal user profile, shopping cart , user purchases, search bar , category filters
            </p> */}
                    <p className="pitch">
                        Find the best deals for high value sneakers and sell your own with <br />
                        zero commison fees!!!
                    </p>


                    <div class="networking">
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
                </div>

            </div>
        </div>
    )
}


export default AboutPage;
