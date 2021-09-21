import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";
import CartItem from "./CartItem";
import "./Cart.css"




function ShoppingCart(){
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state)=> state.shoppingCart)
    // console.log("cart", Object.values(shoppingCart))
    const cart = Object.values(shoppingCart)

    // console.log("cart", cart)

    // Sets the Total Amount
    let total =0.00;
    cart.forEach((item)=>{
        console.log("price",item.price)
        total += parseFloat(item.price)
    })
    const totalPrice = total.toFixed(2)

    console.log("total", totalPrice)


    const removeFromCart =  async(item)=>{
        await dispatch(removeShoeFromCart(item.id, cart))
        return
    }


    return(
        <div className="cart-placement">
            <div className="cart-container">
                <h1>Plugged Cart</h1>
                {cart.map((item)=>(
                    <CartItem item={item} key={item.id} />
                ))}



                    {/* Might need to place outside of mapping div */}
                <h2>{ totalPrice >0 ? `Total Amount: $${totalPrice}`:null }</h2>
            </div>
        </div>
    )


}


export default ShoppingCart;
