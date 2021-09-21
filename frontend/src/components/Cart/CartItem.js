import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { removeShoeFromCart } from "../../store/shoppingCart";






function CartItem({item}){
    const dispatch = useDispatch();

//Built out cart and destructure the item thats being passed in as a prop
    const cart = useSelector((state)=> state.shoppingCart)

//Needs to be in a function to be able to useDispatch inside the store
    const removeShoe = async()=>{
        await dispatch(removeShoeFromCart(item.id,cart))
        return
    }


    return(
        <div>
            <img src={item.img} alt="shoe image" />
            <h3>{item.title}</h3>
            <p>Size: {item.size} (Mens)</p>
            <p>Price: ${item.price}</p>
            <button
                onClick={removeShoe}
                >
                    Remove Shoe
                </button>
        </div>
    )
}



export default CartItem;
