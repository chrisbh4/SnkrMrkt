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


    // let reviewUserName;
    /*
       - clean up all the commented out code
       - need to fix align ment when edit button renders and doesn't render
    */

    console.log("users : ", users)


    //    const username = ()=>{
    //        if( review.userId === user[review.userId]){
    //            return <p>{user.username}</p>
    //        }else{
    //            return null
    //        }
    //    }



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
                <div className="review-container">
                    <button className="review-edit-button"> <a href={`/reviews/${review.id}/edit`}>Edit</a></button>
                    <p className="review-comment">
                        {review.comment}
                    </p>

                    <div className="review-usernane">
                        {users?.map((oneUser) => {
                            // Each User gets hit inside the .map
                            //    console.log("single user", oneUser)
                            if (oneUser.id === review.userId) {
                                //if condition is working
                                console.log("map is working:", oneUser)
                                return oneUser.username;
                            }
                            // console.log("else :", oneUser.username)
                            // return
                             else {
                                //   console.log("else gets hit",oneUser.username)
                                //   return oneUser.username;
                                return null;
                            }
                        })

                        }

                    </div>
                    <img src={review.image} alt="user review" className="review-image"></img>

                </div>
            )
            // If the logged in user is not the owner of the reviews then a edit button doesn't show
        } else {
            return <div className="review-container">

                <p className="review-comment">
                    {review.comment}
                </p>
                {/* <p className="review-username"></p> */}

                <div className="review-usernane">
                        {users?.map((oneUser) => {
                            // Each User gets hit inside the .map
                            //    console.log("single user", oneUser)
                            if (oneUser.id === review.userId) {
                                //if condition is working
                                console.log("map is working:", oneUser)
                                return oneUser.username;
                            }
                            // console.log("else :", oneUser.username)
                            // return
                             else {
                                //   console.log("else gets hit",oneUser.username)
                                //   return oneUser.username;
                                return null;
                            }
                        })

                        }

                    </div>
                <img src={review.image} alt="user review" className="review-image"></img>
            </div>

        }
    })

    return (
        <>
            {/* <h3>Reviews</h3> */}
            {createReviewButton}
            <div>
            <div className="review-labels">
                    <p className='label-review-image'> Review Image</p>
                    <p className="label-review-comment">Review</p>
                    <p className="label-review-username"> Username</p>
                </div>
                {reviewsAndEditButton}
            </div>
        </>
    )
}


export default ShoeReviews
