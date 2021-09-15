import React , { useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory,  } from "react-router-dom"
import { fetchEditReview , fetchDeleteReview} from "../../../store/reviews"
import "./EditReviewForm.css"



function EditReviewForm({review}){
    const dispatch = useDispatch()
    // const params = useParams()
    const history = useHistory()

    const reviewId = review.id
    // useEffect(() => {

    //     dispatch(fetchOneReview(reviewId))
    // }, [dispatch, reviewId]);



    const userId = useSelector((state)=> state.session.user.id)
    
    // const review = useSelector((state)=> state.reviews)
    const shoeId = review?.shoeId

    const [comment, setComment] = useState(review.comment)
    const [rating, setRating] = useState(review.rating)
    const [image , setImage ] = useState(review.image)
    const [errors , setErrors] = useState([])


    console.log("review:", review)
    console.log("comment:", review?.comment)
    console.log("rating:", review?.rating)

    // console.log("comment", review?.rating)
    const updateComment = (e) => setComment(e.target.value)
    const updateRating = (e) => setRating(e.target.value)
    const updateImage = (e) => setImage(e.target.value)

    let errorHandler;
    if(errors.errors){
       errorHandler = errors.errors.map((error)=>{
                console.log(error)
                return (
                         <p key={error.id}>{error}</p>
                     )
            })
    }
    else{
         errorHandler=null;
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(fetchEditReview(shoeId,userId, comment, rating, image , reviewId))

        if (!data.errors) {
            //Without Modal doesn't cause redirect to be in the middle of the homepage
            //Goes to the top of the page like normal
            history.push(`/shoes/${review?.shoeId}`)
            alert("Your Review has been changed")
        }else{
            setErrors(data)
            return data

        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(fetchDeleteReview(reviewId))
        alert("Review has been deleted.");
        history.push(`/shoes/${review?.shoeId}`)
    }

    return(
        <div className="edit-review-placement">
               <h1 className="edit-page-title">
                <a href={`/shoes/${review?.shoeId}`}>Edit Review</a>

            </h1>
            <div className="edit-review-form">
            <form onSubmit={onSubmit}>
                {errorHandler}
                <div className="edit-review-item">
                    <label>Comment :</label>
                    <textarea
                        placeholder={review?.comment}
                        onChange={updateComment}
                    ></textarea>
                </div>
                <div className="edit-review-item">
                    <label>
                       Rating :
                   </label>
                    {/*
                    <input
                        type="number"
                        onChange={updateRating}
                    ></input> */}

                    <input
                        name="rating"
                        onChange={updateRating}
                        type="radio"
                        value="1"
                        >

                        </input>
                            <label>1</label>
                    <input  name="rating"
                    onChange={updateRating}
                        type="radio"
                        value="2"
                        >

                        </input>
                            <label>2</label>
                    <input  name="rating"
                    onChange={updateRating}
                        type="radio"
                        value="3"
                        >

                        </input>
                            <label>3</label>
                    <input  name="rating"
                    onChange={updateRating}
                        type="radio"
                        value="4"
                        >

                        </input>
                            <label>4</label>
                    <input  name="rating"
                    onChange={updateRating}
                        type="radio"
                        value="5"
                        >

                        </input>
                            <label>5</label>

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
                    <div className="delete-review-button">
                        <button type="button" onClick={handleDelete}>Delete</button>
                    </div>
            </form>
            </div>
        </div>
    )
}



export default EditReviewForm;
