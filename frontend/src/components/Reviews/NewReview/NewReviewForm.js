import React , { useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchCreateReview } from "../../../store/reviews"
import "./NewReviewForm.css"



function NewReviewForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    const shoeId = params.id ;
    const userId = useSelector((state)=> state.session.user.id)

    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    // const [image , setImage ] = useState("")
    const [image  ] = useState("")
    const [errors , setErrors] = useState([])

    const updateComment = (e) => setComment(e.target.value)
    const updateRating = (e) => setRating(e.target.value)
    // const updateImage = (e) => setImage(e.target.value)


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
             <h1 className="page-title-review">
                <a href={`/shoes/${shoeId}`}>New Review</a>
            </h1>
            <div className="create-review-form">
            <form onSubmit={onSubmit}>
                {errorHandler}
                <div className="create-review-item">
                    <label>Comment :</label>
                    <textarea
                        id="review-textarea"
                        onChange={updateComment}
                    ></textarea>
                </div>
                <div className="create-review-item">
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

                {/* <div className="create-review-item">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            onChange={updateImage}
                        ></input>
                    </div> */}
                    <div className="submit-review-button-div">
                        <button className="new-review-button" type="submit">Submit</button>
                    </div>
            </form>
            </div>
        </div>
    )
}



export default NewReviewForm;
