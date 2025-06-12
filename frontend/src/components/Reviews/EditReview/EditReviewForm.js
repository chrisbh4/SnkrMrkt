import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchEditReview, fetchOneReview, fetchDeleteReview } from '../../../store/reviews'
import './EditReviewForm.css'

function EditReviewForm () {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const reviewId = params?.id

  useEffect(() => {
    dispatch(fetchOneReview(reviewId))
  }, [dispatch, reviewId])

  const review = useSelector((state) => state.reviews)

  const userId = useSelector((state) => state.session.user.id)
  const shoeId = review?.shoeId

  const [comment, setComment] = useState(review?.comment)
  const [rating, setRating] = useState(review?.rating)
  const [image, setImage] = useState(review?.image)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setComment(review?.comment)
    setRating(review.rating)
    setImage(review.image)
  }, [review.rating, review.comment, review.image])

  const updateComment = (e) => setComment(e.target.value)
  const updateRating = (e) => setRating(e.target.value)

  let errorHandler
  if (errors.errors) {
    errorHandler = errors.errors.map((error) => {
      return (
        <p key={error.id}>{error}</p>
      )
    })
  } else {
    errorHandler = null
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = await dispatch(fetchEditReview(shoeId, userId, comment, rating, image, reviewId))

    if (!data.errors) {
      navigate(`/shoes/${review?.shoeId}`)
      alert('Your Review has been changed')
    } else {
      setErrors(data)
      return data
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    
    // Determine shoe identifier and type from the review
    const shoeIdentifier = review?.styleID || review?.shoeId
    const shoeType = review?.styleID ? 'stockx' : 'local'
    
    await dispatch(fetchDeleteReview(reviewId, shoeIdentifier, shoeType))
    alert('Review has been deleted.')
    
    // Navigate based on shoe type
    if (shoeType === 'stockx') {
      navigate(`/sneaker/${review?.styleID}`)
    } else {
      navigate(`/shoes/${review?.shoeId}`)
    }
  }

  return (
    <div className='edit-review-placement'>
      <h1 className='edit-page-title'>
        <a href={`/shoes/${review?.shoeId}`}>Edit Review</a>

      </h1>
      <div className='edit-review-form'>
        <form onSubmit={onSubmit} id='review-edit-form'>

          <div className='new-errors-review-edit' hidden={!errors.errors?.length}>
            {errorHandler}
          </div>

          <div className='edit-review-item'>
            <label>Comment :</label>
            <textarea
              id='review-textarea'
              placeholder={review?.comment}
              onChange={updateComment}
            />
          </div>
          <div className='edit-review-item'>
            <label>
              Rating :
            </label>
            {/*
                    <input
                        type="number"
                        onChange={updateRating}
                    ></input> */}

            <input
              name='rating'
              onChange={updateRating}
              type='radio'
              value='1'
            />
            <label>1</label>
            <input
              name='rating'
              onChange={updateRating}
              type='radio'
              value='2'
            />
            <label>2</label>
            <input
              name='rating'
              onChange={updateRating}
              type='radio'
              value='3'
            />
            <label>3</label>
            <input
              name='rating'
              onChange={updateRating}
              type='radio'
              value='4'
            />
            <label>4</label>
            <input
              name='rating'
              onChange={updateRating}
              type='radio'
              value='5'
            />
            <label>5</label>

          </div>

          {/* <div className="edit-review-item">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            onChange={updateImage}
                        ></input>
                    </div> */}
          <div className='edit-review-button-div'>
            <button className='edit-review-buttons' type='submit'>Submit</button>
          </div>
          <div className='delete-review-button-div'>
            <button className='edit-review-buttons' type='button' onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditReviewForm
