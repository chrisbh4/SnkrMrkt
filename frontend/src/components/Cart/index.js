import React from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { purchaseFromCart } from "../../store/shoppingCart";
import CartItem from "./CartItem";
import "./Cart.css"


/*
 * Chakra UI components
Img
- https://chakra-ui.com/docs/components/image/usage

Container
-


*/



function ShoppingCart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const userTitle = useSelector((state) => state.session.user.username)
    const cart = Object.values(shoppingCart);



    // Sets the Total Amount
    let total = 0.00;
    cart.forEach((item) => {
        total += parseFloat(item.price)
    })
    const totalPriceOfShoes = total.toFixed(2)
    const feePrices = total * 0.01
    const stateTax = 2
    const pricePostTaxes = total + stateTax + feePrices
    const totalWithFees = total + feePrices
    console.log(feePrices.toFixed(2))



    const emptyCart = <h1 className="empty-cart">Shoppping Cart is empty </h1>

    const purchaseTheCart = async () => {
        await dispatch(purchaseFromCart())
        alert("Order has been Placed")
        navigate('/')
        return
    }


    return (
        // <div className="cart-background">


        <div className="cart-placement">
            <div className="cart-container">
                {cart.map((item) => (
                    <CartItem item={item} key={item.id} />
                ))}
            </div>
            <div className="cart-info">
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `Plug Price : $${totalPriceOfShoes}` : emptyCart}</h2>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `Site fee 1.5%  : ${feePrices.toFixed(2)}` : null}</h2>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `State Tax: ${stateTax.toFixed(2)}` : null}</h2>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `Total: ${pricePostTaxes.toFixed(2)}` : null}</h2>


                {totalPriceOfShoes > 0 ? <button className="cart-purchase-button" onClick={purchaseTheCart} >Purchase</button> : null}
                <div className="cart-footer-placement">


                <footer className="cart-footer">

                    <p className="cart-footer-creator">Christian Brown</p>

                    <div class="networking">
                        <a href="https://www.linkedin.com/in/christian-brown-8770311ba/">
                            <i class="fab fa-linkedin cart-icon"></i>
                        </a>
                        <a href="mailto:Chrismbh4@gmail.com">
                            <i class="fas fa-envelope-square cart-icon"></i>
                        </a>

                        <a href="https://github.com/chrisbh4">
                            <i class="fab fa-github cart-icon"></i>
                        </a>
                    </div>






                </footer>
            </div>
                        </div>
        </div>
    )


}


export default ShoppingCart;
