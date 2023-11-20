import { csrfFetch } from './csrf'

const LOAD_SNKR_API = 'snks_api/LOAD_SNKR_API'

// const LOAD_ONE_SNKR = 'snks_api/LOAD_ONE_SNKR';

const loadSnkr = (stockX_api) => ({
  type: LOAD_SNKR_API,
  stockX_api
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
  const res = await csrfFetch('/api/test')

  if (res.ok) {
    const data = await res.json()

    dispatch(loadSnkr(data.snks_api[0]))
    return data
  }
}

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_SNKR_API:
      return { ...state, ...action.stockX_api }
    default:
      return state
  }
}

export default reducer
