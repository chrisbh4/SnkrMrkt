import React from "react";
import { useSelector } from "react-redux";
import "./ShoeReviews.css"


function ShoeReviews({ shoe }) {

    const userId = useSelector((state) => {
        if (state.session.user) {
            return state.session.user.id
        }
        return 0.5;
    })

    const user = useSelector((state)=> state.session.user)
    let reviewUserName;

    // console.log("user : ", user.username)

    let createReviewButton;
    if (userId > 0.9) {
        createReviewButton = (
            <>
                <button className="leave-review-button"><a href={`/shoes/${shoe?.id}/reviews/new`}>Leave a Review</a></button>
                <div className="review-labels">
                    <p className='label-review-image'> Review Image</p>
                    <p className="label-review-comment">Review</p>
                    <p className="label-review-username"> Username</p>
                </div>
            </>
        )
    }

    const reviewsAndEditButton = shoe?.Reviews.map((review) => {
        // console.log("single review:", review.id)
        if (userId === review.userId) {
            return (
                <div className="review-container">
                    <button className="review-edit-button"> <a href={`/reviews/${review.id}/edit`}>Edit</a></button>
                    <p className="review-comment">
                        {review.comment}
                    </p>
                    <p className="review-usernane">
                        {review.userId}
                    </p>
                    <img src={review.image} alt="user review" className="review-image"></img>

                </div>
            )
        } else {
            return <div className="review-container">
                <p className="review-comment">
                    {review.comment}
                </p>
                <p className="review-username">
                </p>
                <img src={review.image} alt="user review" className="review-image"></img>
            </div>

        }
    })

    return (
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
