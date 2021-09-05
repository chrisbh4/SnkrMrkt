import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const LOAD_ONE_REVIEW = 'reviews/LOAD_ONE_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';



const loadReviews = (reviews)=>({
    type:LOAD_REVIEWS,
    reviews
});


const loadOneReview = (review)=>({
    type:LOAD_ONE_REVIEW,
    review
});

const createReview = (review)=>({
    type:CREATE_REVIEW,
    review
});

const editReview = (reviewId)=>({
    type:EDIT_REVIEW,
    reviewId
});

const deleteReview = (reviewId)=>({
    type:DELETE_REVIEW,
    reviewId
});



export const fetchAllReviews = () => async (dispatch)=>{
    const res = await csrfFetch('/api/reviews')

    if(res.ok){
        const data = await res.json()
        dispatch(loadReviews(data))
        return data
    }
}

export const fetchOneReview = (reviewId) => async (dispatch)=>{
    const res = await csrfFetch(`/api/reviews/${reviewId}`)

    if(res.ok){
        const data = await res.json()
        dispatch(loadOneReview(data))
        return data
    }
}

export const fetchCreateReview= (shoeId, userId, comment, rating, image ) => async (dispatch)=>{
    const res = await csrfFetch(`/api/reviews/new`,{
        method:"POST",
        header:{"Content-Type": "application/json"},
        body:JSON.stringify({shoeId, userId, comment, rating, image })
    })

    if(res.ok){
        const data = await res.json()
        dispatch(createReview(data))
        return data
    }
}
//fix csrfFetch to grab the correct route
export const fetchEditReview= (shoeId, userId, comment, rating, image, reviewId) => async (dispatch)=>{
  debugger
    const res = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:"PUT",
        header:{"Content-Type": "application/json"},
        body:JSON.stringify({shoeId, userId, comment, rating, image })
    })
    debugger
    const data = await res.json()
    if(res.ok){
        debugger
        dispatch(editReview(data))
        return data
    }else{
        return data
    }
}


export const fetchDeleteReview= (reviewId)=> async(dispatch)=>{
    const res = await csrfFetch(`/api/review/${reviewId}`,{
        method:"DELETE"
    })

    if(res.ok){
        const data = res.json()
        dispatch(deleteReview(data))
        return data
    }
    return
}

const initialState = {};

function reducer ( state = initialState, action){
    let newState = {...state}
    switch(action.type){
        case LOAD_REVIEWS:
            return {...state, ...action.reviews}
        case LOAD_ONE_REVIEW:
            return {...state,...action.review}
        case EDIT_REVIEW:
            debugger
            state[action.id] = action.review
            return state
        default:
            return state

    }
}



export default reducer;
