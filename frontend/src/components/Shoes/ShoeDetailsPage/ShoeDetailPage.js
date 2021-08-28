import React from "react"
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import "./ShoeDetails.css"


function ShoesDetailsPage() {
    const params = useParams()

    const shoeId = params.id
    console.log("Parmas Id: ", shoeId)

    const shoe = (useSelector((state) => state.shoes[shoeId]))

    //  console.log('Shoes :' , shoe.Reviews[0])


    return (
        <>
            <h1>
                Shoes Details Page
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
            {/* Reviews is outside of the ' detials-container ' */}
                <div className="reviews-container">
                    <h3>Reviews</h3>
                    {/* Reviews go here */}
                </div>


        </>
    )
}



export default ShoesDetailsPage
