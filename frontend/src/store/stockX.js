import { csrfFetch } from './csrf'

const LOAD_MOST_POPULAR_API = 'snks_api/LOAD_MOST_POPULAR_API'
const LOAD_SEARCH_STOCKX_DB_API = 'snks_api/LOAD_SEARCH_STOCKX_DB_API'

// const LOAD_ONE_SNKR = 'snks_api/LOAD_ONE_SNKR';

const loadMostPopular = (stockXAPI) => ({
  type: LOAD_MOST_POPULAR_API,
  stockXAPI
})
const loadSearchStockxApiDatabase = (stockXAPI) => ({
  type: LOAD_SEARCH_STOCKX_DB_API,
  stockXAPI
})

// const loadOneSnkr = (review) => ({
//     type: LOAD_ONE_SNKR,
//     review
// });

// export const fetchOneReview = (reviewId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/snkr/${reviewId}`)

//     if (res.ok) {
//         const data = await res.json()
//         dispatch(loadOneReview(data))
//         return data
//     }
// }

export const fetchMostPopular = () => async (dispatch) => {
  const res = await csrfFetch('/api/sneaks/most')

  if (res.ok) {
    const data = await res.json()
    console.log(data[0])
    await dispatch(loadMostPopular(data))
    return data
  }
  else {
    console.log('Error in fetchMostPopular')
    return {"error": "Error in fetchMostPopular"}
  }
}

export const searchStockxApiDatabase = (payload) => async (dispatch) => {
  const shoeName = payload
  const res = await csrfFetch('/api/sneaks/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shoe: shoeName })
  })

  if (res.ok) {
    const data = await res.json()
    console.log(data)
    await dispatch(loadSearchStockxApiDatabase(data))
    return data
  }
  else {
    console.log('Error in search bar API')
    return {"error": "Error in search bar API"}
  }
}
const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_MOST_POPULAR_API:
      return { ...state, ...action.stockXAPI }
    case LOAD_SEARCH_STOCKX_DB_API:
      return { ...action.stockXAPI }
    default:
      return state
  }
}

export default reducer
