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

    const userId = useSelector((state)=> state.session.user.id)

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchCreateReview(userId, comment, rating, image))
        // brand,

        if (!data.errors) {
            // TODO: Create User Profile and redirect user to show new shoe being listed under them
            history.push(`/`)
            throw alert("Your Shoe has now been listed for sale.")
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



export default NewReviewForm;
