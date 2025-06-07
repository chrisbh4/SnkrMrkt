import { csrfFetch } from './csrf'

const LOAD_SNKR_API = 'snks_api/LOAD_SNKR_API'
const LOAD_SEARCH_RESULTS = 'snks_api/LOAD_SEARCH_RESULTS'
const LOAD_SNEAKER_DETAILS = 'snks_api/LOAD_SNEAKER_DETAILS'

// const LOAD_ONE_SNKR = 'snks_api/LOAD_ONE_SNKR';

const loadSnkr = (stockXAPI) => ({
  type: LOAD_SNKR_API,
  stockXAPI
})

const loadSearchResults = (results) => ({
  type: LOAD_SEARCH_RESULTS,
  results
})

const loadSneakerDetails = (details) => ({
  type: LOAD_SNEAKER_DETAILS,
  details
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

export const getSneakerDetails = (styleId) => async (dispatch) => {
  const res = await csrfFetch(`/api/test/details?styleId=${encodeURIComponent(styleId)}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadSneakerDetails(data.product))
    return data.product
  }
}

export const searchSneakers = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/test/search?query=${encodeURIComponent(query)}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadSearchResults(data.products))
    return data.products
  }
}

export const fetchMostPopular = () => async (dispatch) => {
  const res = await csrfFetch('/api/test')

  if (res.ok) {
    const data = await res.json()
    dispatch(loadSnkr(data.snks_api[0]))
    return data
  }
}

const initialState = {
  searchResults: [],
  popularItems: {},
  currentSneaker: null
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_SNKR_API:
      return { ...state, popularItems: { ...action.stockXAPI } }
    case LOAD_SEARCH_RESULTS:
      return { ...state, searchResults: action.results }
    case LOAD_SNEAKER_DETAILS:
      return { ...state, currentSneaker: action.details }
    default:
      return state
  }
}

export default reducer
