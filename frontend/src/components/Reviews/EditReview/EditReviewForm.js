import React , {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchEditReview } from "../../../store/reviews"
import "./EditReviewForm.css"



function EditReviewForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    // const [comment, setComment] = useState("")
    // const [rating, setRating] = useState(0)
    // const [image , setImage ] = useState("")

    const reviewId = params.id

    const userId = useSelector((state)=> state.session.user.id)

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchEditReview(userId, comment, rating, image))


        if (!data.errors) {

            history.push(`/`)
            throw alert("Your Review has been changed")
        }
        else {
            // setErros(data)
        }
        return data
    }

    return(
        <div className="">
            <div className="">
            <form onSubmit={onSubmit}>
                <div>
                    <label>Comment :</label>
                    <textarea></textarea>
                </div>
                <div>
                    <label>
                        Rating :
                    </label>
                    <input
                        type="number"
                    ></input>
                    </div>

                <div className="">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            // onChange={}
                        ></input>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
            </form>
            </div>
        </div>
    )
}



export default EditReviewForm;
