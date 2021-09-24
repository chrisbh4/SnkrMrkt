import React, { useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import "./ShoeDetails.css"
import ShoeReviews from "../../Reviews/ShoeReviews/ShoeReviews"
import { getAllShoes } from "../../../store/shoes"
import { addShoeToCart } from "../../../store/shoppingCart"


function ShoesDetailsPage() {
    const dispatch = useDispatch()
    const params = useParams()


    useEffect(() => {
        dispatch(getAllShoes())

    }, [dispatch]);

    const shoeId = params.id

    const userId = useSelector((state) => {
        if (state.session.user) {
            return state.session.user.id
        }
        return 0.5;
    })

    const shoe = useSelector((state) => state.shoes[shoeId])
    const cart = useSelector((state) => state.shoppingCart)



    //* Checks if Image string contains either jpeg, png, or image inside it's string
    let imageCheck;
    if( shoe?.image.includes("jpeg") || shoe?.image.includes("png") || shoe?.image.includes("image")){
        imageCheck = <img src={shoe?.image} alt={shoe?.title}></img>
    }else{
        imageCheck = <img className="bad-image" alt={shoe?.title}></img>

    }

    // const badImage = <img src="src/background-images/No-Image-Available.png" alt="bad text" ></img>;


    console.log("check image :", imageCheck)
    const addToCart = async () => {
        await dispatch(addShoeToCart(shoe, cart))
        alert("Shoe has been added to your cart!")
        return
    }


    const shoeSellerId = shoe?.sellerId


    let sellerChecker;
    if (userId) {
        if (userId === shoeSellerId) {
            sellerChecker = (
                <div>
                    <Link to={`/shoes/${shoe?.id}/edit`} key={shoe.id}>
                        <button> Edit </button>
                    </Link>
                </div>
            )
        }
    } else {
        return sellerChecker;
    }
    let addToCartVerfication;
    if (userId !== shoeSellerId && userId > 0.99) {
        addToCartVerfication = (
            <div>
                {/* <Link to={`/`}> */}
                <button onClick={addToCart}> Add to Cart </button>
                {/* </Link> */}
            </div>
        )
    }



    return (
        <>
            <h1 className="details-page-title">
                <a id="details-page-redirect" href="/">Shoes Details Page</a>
            </h1>
            <div className="details-container">
                <div className="shoe-details-container">
                    <div className="shoe-details-image">
                        {/* <img src={imageCheck} alt={shoe?.title}></img>z */}
                        {/* <img src="../../../../src/background-images/No-Image-Available.png" alt={shoe?.title}></img> */}
                        {imageCheck}
                    </div>
                    <div className="shoe-title">
                        <h2>{shoe?.title}</h2>
                    </div>
                    <div className="shoe-size">
                        <h4>Size: {shoe?.shoeSize}</h4>
                    </div>
                    <div className="shoe-price">
                        <h3>Price: ${shoe?.price}</h3>
                    </div>
                    <div className="shoe-brand">
                        <h3>{shoe?.brand}</h3>
                    </div>
                    <div className="shoe-description">
                        <h4>Description </h4>
                        <p>{shoe?.description}</p>
                    </div>
                </div>
            </div>
            <div className="shoe-details-checker">
                {sellerChecker}
                {addToCartVerfication}


            </div>
            {/* Reviews is outside of the ' detials-container ' */}
            {/* Take all of this and place inside a componenet and pass in the shoe as a prop */}
            {/* <div className="reviews-title"> */}
            <h2 id="reviews-title">
                <a href="/">Reviews</a>
            </h2>
            {/* </div> */}

            <div className="reviews-container">
                <div className="reviews">
                    <ShoeReviews shoe={shoe} key={shoe?.id} />
                </div>
            </div>

            <div className="reviews-spacer">
                {/* <p>duh</p> */}
            </div>


        </>
    )
}



export default ShoesDetailsPage
