import { csrfFetch } from './csrf'

const LOAD_MOST_POPULAR = 'snks_api/LOAD_MOST_POPULAR'

const loadMostPopular = (mostPopular) => ({
  type: LOAD_MOST_POPULAR,
  mostPopular
})


export const fetchMostPopular = () => async (dispatch) => {
//   const res = await csrfFetch('/api/sneaks/most')
const res = await csrfFetch('/api/sneaks/most', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })

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
      return { ...action.mostPopular }
    default:
      return state
  }
}

export default reducer
