import { csrfFetch } from './csrf'

const LOAD_SNKR_API = 'snks_api/LOAD_SNKR_API'
const LOAD_SEARCH_RESULTS = 'snks_api/LOAD_SEARCH_RESULTS'
const LOAD_SNEAKER_DETAILS = 'snks_api/LOAD_SNEAKER_DETAILS'
const LOAD_MOST_POPULAR = 'snks_api/LOAD_MOST_POPULAR'

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

const loadMostPopular = (products) => ({
  type: LOAD_MOST_POPULAR,
  products
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

export const searchByExactName = (shoeName) => async (dispatch) => {
  const res = await csrfFetch(`/api/stockx/search?query=${encodeURIComponent(shoeName)}`)

  if (res.ok) {
    const data = await res.json()
    if (data.products && data.products.length > 0) {
      // Get the first result and fetch its details
      const firstMatch = data.products[0]
      await dispatch(getSneakerDetails(firstMatch.styleID))
      return firstMatch.styleID
    }
    return null
  }
  return null
}

export const getSneakerDetails = (styleId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stockx/details?styleId=${encodeURIComponent(styleId)}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadSneakerDetails(data.product))
    return data.product
  }
}

export const searchSneakers = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/stockx/search?query=${encodeURIComponent(query)}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadSearchResults(data.products))
    return data.products
  }
}

export const fetchMostPopular = () => async (dispatch) => {
  const res = await csrfFetch('/api/stockx')

  if (res.ok) {
    const data = await res.json()
    dispatch(loadSnkr(data.snks_api[0]))
    return data
  }
}

export const fetchMostPopularShoes = (limit = 8) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/stockx/most-popular?limit=${limit}`)

    if (res.ok) {
      const data = await res.json()
      dispatch(loadMostPopular(data.products))
      return data.products
    } else {
      console.error('Failed to fetch most popular shoes, status:', res.status)
    }
  } catch (error) {
    console.error('Error fetching most popular shoes:', error)
  }
}

const initialState = {
  searchResults: [],
  popularItems: {},
  mostPopular: [],
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
    case LOAD_MOST_POPULAR:
      return { ...state, mostPopular: action.products }
    default:
      return state
  }
}

export default reducer
