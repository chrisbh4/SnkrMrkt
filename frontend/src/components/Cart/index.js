import React from "react";
import { useSelector } from "react-redux";

import "./Cart.css"




function ShoppingCart(){

    const shoppingCart = useSelector((state)=> state.shoppingCart)
    console.log("cart", Object.values(shoppingCart))
    const cart = Object.values(shoppingCart)

    console.log("cart", cart)

    let total =0.00;
    cart.forEach((item)=>{
        console.log("price",item.price)
        total += parseFloat(item.price)
    })
    const totalPrice = total.toFixed(2)

    console.log("total", totalPrice)


    return(
        <div className="cart-placement">
            <div className="cart-container">
                <h1>Plugged Cart</h1>
                {cart.map((item)=>{
                    return(
                        <div className="cart-item-container" key={item.id}>
                            <div className="cart-item">
                                    {/* Need to add image to shopping cart state */}
                                    {/* <img src={item.img} /> */}
                                    <p>{item.title}</p>
                                    <p>{item.price}</p>
                             </div>
                        </div>
                    )
                })}
                    {/* Might need to place outside of mapping div */}
                <h2>{ totalPrice >0 ? `Total Price: $${totalPrice}`:null }</h2>
            </div>
        </div>
    )


}


export default ShoppingCart;
