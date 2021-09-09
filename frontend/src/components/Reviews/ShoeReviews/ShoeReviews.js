import React from "react";
import { useSelector } from "react-redux";
import "./ShoeReviews.css"


function ShoeReviews({shoe}){

    const userId = useSelector((state) => {
        if (state.session.user) {
            return state.session.user.id
        }
        return 0.5;
    })

    let createReviewButton;
    if(userId > 0.9){
        createReviewButton = (
            <>
            <button className="leave-review-button"><a href={`/shoes/${shoe?.id}/reviews/new`}>Leave a Review</a></button>
            <div className="review-labels">
                <p>Review</p>
                <p> Created By</p>
                <p> Review Image</p>
            </div>
            </>
        )
    }

    const reviewsAndEditButton = shoe?.Reviews.map((review) => {
        // console.log("single review:", review.id)
        if ( userId === review.userId){
            return(
                <div className="review-container">
            <p>{review.comment} </p>
            <p>Reviewd by: 'UserName'</p>
            <img className="review-image" src={review.image} />
           <button > <a href={`/reviews/${review.id}/edit`}>Edit</a></button>
            </div>
            )
        }else{
            return <div>
                <p>
                {review.comment}
                </p>
                <p>{review.userId}</p>
                <img src={review.image} alt="Review Image"></img>
                </div>

        }
   })

    return(
        <>
        {/* <h3>Reviews</h3> */}
        {createReviewButton}
        <div>
        {reviewsAndEditButton}
        </div>
    </>
    )
}


export default ShoeReviews
