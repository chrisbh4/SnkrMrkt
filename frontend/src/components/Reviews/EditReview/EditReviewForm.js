import React , {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchEditReview , fetchOneReview , fetchAllReviews } from "../../../store/reviews"
import "./EditReviewForm.css"



function EditReviewForm(){
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    const reviewId = params.id
    // console.log('review id ',reviewId)
    useEffect(() => {
        // dispatch(fetchAllReviews())
        dispatch(fetchOneReview(reviewId))
    }, [dispatch , reviewId]);

    const userId = useSelector((state)=> state.session.user.id)
    const review = useSelector((state)=> state.reviews)
    const shoeId = review.shoeId

    console.log("review", review.comment)

    const [comment, setComment] = useState(review.comment)
    const [rating, setRating] = useState(review.rating)
    const [image , setImage ] = useState("")
    const [errors , setErrors] = useState([])

    const updateComment = (e) => setComment(e.target.value)
    const updateRating = (e) => setRating(e.target.value)
    const updateImage = (e) => setImage(e.target.value)




    const onSubmit = async (e) => {
        e.preventDefault();
        // const data = await dispatch(fetchEditReview(shoeId, userId, comment, rating, image))
        const data = await dispatch(fetchEditReview( shoeId,userId, comment, rating, image))

        if (!data.errors) {

            history.push(`/`)
            throw alert("Your Review has been changed")
        }
        else {
            setErrors(data)
        }
        return data
    }

    return(
        <div className="edit-review-placement">
               <h1 className="edit-page-title">
                <a href="/">Edit Review</a>

            </h1>
            <div className="edit-review-form">
            <form onSubmit={onSubmit}>
                <div className="edit-review-item">
                    <label>Comment :</label>
                    <textarea
                        placeholder={comment}
                        onChange={updateComment}
                    ></textarea>
                </div>
                <div className="edit-review-item">
                    <label>
                        Rating :
                    </label>
                    <input
                        type="number"
                        placeholder={rating}
                        onChange={updateRating}
                    ></input>
                    </div>

                <div className="edit-review-item">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            onChange={updateImage}
                        ></input>
                    </div>
                    <div className="edit-review-button">
                        <button type="submit">Submit</button>
                    </div>
            </form>
            </div>
        </div>
    )
}



export default EditReviewForm;
