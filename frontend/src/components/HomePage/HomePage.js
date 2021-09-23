import React  ,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllShoes} from "../../store/shoes";
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
        <div className="page">

        <h1 className="homepage-title">ThePlug</h1>
        <div className="all-shoes-container">
            {shoesArray.map((shoe)=>{
                return(
                    <div className="shoe-container" key={shoe.id}>
                    <div>
                        {/* <h2>{shoe.id}</h2> */}
                        <div className="shoe-image-container">
                            <a href={`/shoes/${shoe.id}`} >
                                <img className="shoe-image" src={shoe.image} alt={shoe.title}></img>
                            </a>
                        </div>
                        <div id="homepage-shoe-title"className="shoes-title">
                            <p className="homepage-shoe-title">
                                {shoe.title}
                            </p>

                        </div>
                        <div className="shoes-shoeSize">
                            <h4>{shoe.brand.toUpperCase()}</h4>
                        </div>
                        <div className="shoes-shoeSize">
                            <h4> Size: {shoe.shoeSize}</h4>
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
        </div>

    )

}


export default HomePage;
