import { csrfFetch } from './csrf'

const LOAD_MOST_POPULAR = 'snks_api/LOAD_MOST_POPULAR'

const loadMostPopular = (stockXAPI) => ({
  type: LOAD_MOST_POPULAR,
  stockXAPI
})


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

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_MOST_POPULAR:
      return { ...state, ...action.stockXAPI }
    default:
      return state
  }
}

export default reducer
