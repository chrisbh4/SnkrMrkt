import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/session";
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
    const defaultImage = <img src={shoe?.image} className="review-image" alt="default shoe"></img>
    const defaultImageNoEdit = <img src={shoe?.image} className="review-image-noEdit" alt="default shoe"></img>



    let createReviewButton;
    if (userId > 0.9) {
        createReviewButton = (
            <>
                <a href={`/shoes/${shoe?.id}/reviews/new`}>
                    <button className="leave-review-button">Leave a Review</button>
                    </a>
            </>
        )
    }

    const reviewsAndEditButton = shoe?.Reviews.map((review) => {

        if (userId === review.userId) {
            //if logged in user is the owner of the review then an edit button will appear
            return (
                <div className="review-container-border">
                <div className="review-container">


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
                    {defaultImage}
                    {/* Need to build a image checker to check if user input image is verified before rending if not a default image is set */}
                    {/* <img src={review.image} alt="user review" className="review-image"></img> */}



                </div>

                {/* //* Edit Button  */}
                <a href={`/reviews/${review.id}/edit`} >
                <button className="review-edit-button" type="button"> Edit </button>
                </a>
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

                {/* <img src={review.image} alt="user review" className="review-image-noEdit"></img> */}
                {defaultImageNoEdit}
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
