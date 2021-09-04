import React , {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchCreateReview } from "../../../store/reviews"
import "./NewReviewForm.css"



function NewReviewForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    const shoeId = params.id
    const userId = useSelector((state)=> state.session.user.id)

    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [image , setImage ] = useState("")
    const [errors , setErrors] = useState([])

    const updateComment = (e) => setComment(e.target.value)
    const updateRating = (e) => setRating(e.target.value)
    const updateImage = (e) => setImage(e.target.value)


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchCreateReview(shoeId, userId, comment, rating, image))

        if (!data.errors) {
            history.push(`/shoes/${shoeId}`)
            throw alert("Your review has been created :)")
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
                    <textarea
                        onChange={updateComment}
                    ></textarea>
                </div>
                <div className="create-review-item">
                    <label>
                        Rating :
                    </label>
                    <input
                        type="number"
                        onChange={updateRating}
                    ></input>
                    </div>

                <div className="create-review-item">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            onChange={updateImage}
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
