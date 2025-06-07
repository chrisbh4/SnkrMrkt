import { csrfFetch } from './csrf'

const LOAD_SEARCH_BAR_STOCKX_DB_API = 'snks_api/LOAD_SEARCH_BAR_STOCKX_DB_API'

const loadSearchStockxApiDatabase = (stockXAPI) => ({
  type: LOAD_SEARCH_BAR_STOCKX_DB_API,
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
    await dispatch(loadSearchStockxApiDatabase(data[0]))
    return data[0]
  }
  else {
    console.log('Error in Search API request')
    return {"error": "Error in Search API request"}
  }
}
const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH_BAR_STOCKX_DB_API:
      return { ...action.stockXAPI }
    default:
      return state
  }
}

export default reducer
