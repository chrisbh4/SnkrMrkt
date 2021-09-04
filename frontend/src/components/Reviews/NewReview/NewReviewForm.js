import React , {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchCreateReview } from "../../../store/reviews"
import "./NewReviewForm.css"



function NewReviewForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [image , setImage ] = useState("")
    const [errors , setErrors] = useState([])

    const userId = useSelector((state)=> state.session.user.id)

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchCreateReview(userId, comment, rating, image))


        if (!data.errors) {

            history.push(`/`)
            throw alert("Your Review has been created")
        }
        else {
            setErrors(data)
        }
        return data
    }

    return(
        <div className="create-review-placement">
             <h1 className="page-title">
                <a href="/">New Review</a>

            </h1>
            <div className="create-review-form">
            <form onSubmit={onSubmit}>
                <div className="create-review-item">
                    <label>Comment :</label>
                    <textarea></textarea>
                </div>
                <div className="create-review-item">
                    <label>
                        Rating :
                    </label>
                    <input
                        type="number"
                    ></input>
                    </div>

                <div className="create-review-item">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            // onChange={}
                        ></input>
                    </div>
                    <div >
                        <button className="create-review-button" type="submit">Submit</button>
                    </div>
            </form>
            </div>
        </div>
    )
}



export default NewReviewForm;
