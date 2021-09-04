import React,{useEffect} from "react";
import { Link, UseParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";




function ShoeReviews({shoe}){

    const userId = useSelector((state) => {
        if (state.session.user) {
            return state.session.user.id
        }
        return 0.5;
    })
    const reviewsAndEditButton = shoe?.Reviews.map((review) => {
        // console.log("single review:", review.id)
        if ( userId === review.userId){
            return(
                <div>
            <p>{review.comment}</p>
           <button> <a href={`/reviews/${review.id}/edit`}>Edit</a></button>
            </div>
            )
        }else{
            return <div>
                <p>
                {review.comment}
                </p>
                <p>{review.userId}</p>
                </div>
        }
   })

    return(
        <>
        <h3>Reviews</h3>
        <button><a href="/reviews/new">Leave a Review</a></button>
        <div>
        {reviewsAndEditButton}
        </div>
    </>
    )
}


export default ShoeReviews
