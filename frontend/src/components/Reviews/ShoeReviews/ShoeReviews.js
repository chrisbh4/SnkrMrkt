import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/session";
import EditReviewModal from "../EditReview/EditReviewModal"

import "./ShoeReviews.css"


function ShoeReviews({ shoe }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const userId = useSelector((state) => {
        if (state.session.user) {
            return state.session.user.id
        }
        return 0.5;
    })

    const users = useSelector((state) => state.session?.users)


    // let userImage;
    // if(review.image){
    //     <img src={review.image} alt="user review" className="review-image"></img>
    // }else{
    //     <img src={shoe.image} alt="user review" className="review-image"></img>
    // }




    let createReviewButton;
    if (userId > 0.9) {
        createReviewButton = (
            <>
                <button className="leave-review-button"><a href={`/shoes/${shoe?.id}/reviews/new`}>Leave a Review</a></button>
            </>
        )
    }

    const reviewsAndEditButton = shoe?.Reviews.map((review) => {

        if (userId === review.userId) {
            //if logged in user is the owner of the review then an edit button will appear
            return (
                <div className="review-container-border">
                <div className="review-container">

                    {/* <button className="review-edit-button"> <a href={`/reviews/${review.id}/edit`}>Edit</a></button> */}

                    <p className="review-comment">
                        {review.comment}
                    </p>

                    <p className="review-rating"> {review.rating}</p>

                    <p className="review-username">
                        {users?.map((oneUser) => {
                            // Each User gets hit inside the .map
                            if (oneUser.id === review.userId) {
                                return oneUser.username;
                            }
                            else {
                                return null;
                            }
                        })

                        }

                    </p>
                    <img src={review.image} alt="user review" className="review-image"></img>


                </div>
                <button className="review-edit-button" type="button">
                        {/* Modal goes here  */}
                        <EditReviewModal review={review} key={review.id} />
                </button>
                </div>
            )
            // If the logged in user is not the owner of the reviews then a edit button doesn't show
        } else {
            return <div className="review-container-noEdit">
                <p className="review-comment-noEdit">
                    {review.comment}
                </p>

                <p className="review-rating-noEdit"> {review.rating}</p>

                <p className="review-username-noEdit">
                    {users?.map((oneUser) => {
                        if (oneUser.id === review.userId) {
                            return oneUser.username;
                        }
                        else {
                            return null;
                        }
                    })
                    }
                </p>

                <img src={review.image} alt="user review" className="review-image-noEdit"></img>
                <div className="reviews-noEdit-button-placement">

                </div>

            </div>

        }
    })

    return (
        <>

            {createReviewButton}
            <div>
                <div className="review-labels">

                    <div className='label-review-image'>
                    <p>Review Images </p></div>
                    <div className="label-review-comment"><p>Reviews </p></div>
                    <div className="label-review-rating"><p>Ratings </p></div>
                    <div className="label-review-username"> <p>Posted By </p></div>
                </div>
                {reviewsAndEditButton}
            </div>
        </>
    )
}


export default ShoeReviews
