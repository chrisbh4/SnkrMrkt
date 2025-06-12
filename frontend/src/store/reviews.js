import { csrfFetch } from './csrf'

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const LOAD_ONE_REVIEW = 'reviews/LOAD_ONE_REVIEW'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const LOAD_SHOE_REVIEWS = 'reviews/LOAD_SHOE_REVIEWS'

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

const loadOneReview = (review) => ({
  type: LOAD_ONE_REVIEW,
  review
})

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

const loadShoeReviews = (reviews) => ({
  type: LOAD_SHOE_REVIEWS,
  reviews
})

export const fetchAllReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews')

  if (res.ok) {
    const data = await res.json()
    dispatch(loadReviews(data))
    return data
  }
}

export const fetchOneReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadOneReview(data))
    return data
  }
}

// Fetch reviews for a specific shoe (works for both local and StockX shoes)
export const fetchShoeReviews = (identifier, type = 'local') => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/shoe/${identifier}?type=${type}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadShoeReviews(data))
    return data
  }
}

// Create review - now supports both local shoes (shoeId) and StockX shoes (styleID)
export const fetchCreateReview = (identifier, userId, comment, rating, image, isStockX = false) => async (dispatch) => {
  const body = {
    userId,
    comment,
    rating,
    image
  }
  
  // Add the appropriate identifier
  if (isStockX) {
    body.styleID = identifier
  } else {
    body.shoeId = identifier
  }

  const res = await csrfFetch('/api/reviews/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(createReview(data))
    return data
  } else {
    return data
  }
}

// Edit review - maintains backward compatibility
export const fetchEditReview = (shoeId, userId, comment, rating, image, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shoeId, userId, comment, rating, image })
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(editReview(data))
    return data
  } else {
    return data
  }
}

export const fetchDeleteReview = (reviewId, shoeIdentifier = null, shoeType = 'local') => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteReview(data))
    
    // Re-fetch reviews for the specific shoe to ensure UI is in sync
    if (shoeIdentifier) {
      await dispatch(fetchShoeReviews(shoeIdentifier, shoeType))
    }
    
    return data
  }
}

const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...action.reviews }
    case LOAD_SHOE_REVIEWS:
      return { ...state, ...action.reviews }
    case LOAD_ONE_REVIEW:
      return { ...state, [action.review.id]: action.review }
    case CREATE_REVIEW:
      return { ...state, [action.review.newReview.id]: action.review.newReview }
    case EDIT_REVIEW:
      return { ...state, [action.review.id]: action.review }
    case DELETE_REVIEW:
      const newState = { ...state }
      delete newState[action.reviewId]
      return newState
    default:
      return state
  }
}

export default reducer
