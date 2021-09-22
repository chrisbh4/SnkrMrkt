import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";






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
        <div className="cart-item-placement">
        <div className="cart-item-grid">
                <img className="cart-item-image" src={item.img} alt="shoe image" />
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-shoeSize">Size: {item.size} (Mens)</p>
                <p className="cart-item-price">Price: ${item.price}</p>
                <button
                    className="cart-remove-button"
                    onClick={removeShoe} >
                        Remove Shoe
                    </button>
            </div>
        </div>
    )
}



export default CartItem;
