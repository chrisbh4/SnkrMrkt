import React, { useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import "./ShoeDetails.css"
import { getAllShoes } from "../../../store/shoes"


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



    const reviews = shoe?.Reviews.map((review) => {
       return <p>{review.comment}</p>
    //    return <li>{review.comment}</li>
   })


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
    let purchaseChecker;
    if (userId !== shoeSellerId && userId > 0.99) {
        purchaseChecker = (
            <div>
                <Link to={`/`}>
                    <button> Purchase </button>
                </Link>
            </div>
        )
    }



    return (
        <>
            <h1>
                <a href="/">Shoes Details Page</a>

            </h1>
            <div className="details-container">
                <div className="shoe-details-container">
                    <div className="shoe-image">
                        <img src={shoe?.image} alt={shoe?.title}></img>
                        <p>Image Here</p>
                    </div>
                    <div className="shoe-title">
                        <h2>{shoe?.title}</h2>
                    </div>
                    <div className="shoe-shoeSize">
                        <h4>Shoe Size {shoe?.shoeSize}</h4>
                    </div>
                    <div className="shoe-price">
                        <h3>${shoe?.price}</h3>
                    </div>
                </div>
            </div>
            <div className="shoe-details-checker">
                {sellerChecker}
                {purchaseChecker}

            </div>
            {/* Reviews is outside of the ' detials-container ' */}
            <div className="reviews-container">
                <h3>Reviews</h3>
                <div>
                {reviews}
                </div>
                {/* Reviews go here */}
            </div>


        </>
    )
}



export default ShoesDetailsPage
