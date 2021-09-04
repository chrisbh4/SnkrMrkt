import React  ,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllShoes, getDeletedShoe } from "../../store/shoes";

import ShoeList from "./ShoeList";
import './ShoeList.css'
function HomePage(){

    const dispatch = useDispatch()

    const shoes= useSelector((state)=> state.shoes)
    // turns the obejct into an array but still don't understand how the keys are iterable now??
    const shoesArray = Object.values(shoes)

    // Loads new State for the HomePage everytime.
    //! Need for Create & Edit feature to be able to auto update the state
    useEffect(()=>{
        dispatch(getAllShoes())
    },[dispatch])

    return(
        <>
        
        <h1 className="homepage-title">ThePlug</h1>
        <div className="all-shoes-container">
            {shoesArray.map((shoe)=>{
                return(
                    <div className="shoe-container" key={shoe.id}>
                    <div>
                        <h2>{shoe.id}</h2>
                        <div className="shoes-image">
                            <a href={`/shoes/${shoe.id}`} >
                                <img src={shoe.image} alt={shoe.title}></img>
                            </a>
                        </div>
                        <div className="shoes-title">
                            <h2>{shoe.title}</h2>
                        </div>
                        <div className="shoes-shoeSize">
                            <h4>Shoe Size {shoe.shoeSize}</h4>
                        </div>
                        <div className="shoes-price">
                            <h3>${shoe.price}</h3>
                        </div>
                    </div>
                </div>
                )
                // <ShoeList key={shoe.id} shoe={shoe} />
    })}
        </div>
        </>

    )

}


export default HomePage
