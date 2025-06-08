import { csrfFetch } from './csrf'

// Action Types
const LOAD_FILTERS = 'filters/LOAD_FILTERS'
const CLEAR_FILTERS = 'filters/CLEAR_FILTERS'
const SET_SELECTED_FILTERS = 'filters/SET_SELECTED_FILTERS'
const LOAD_FILTERED_SHOES = 'filters/LOAD_FILTERED_SHOES'

// Action Creators
const loadFilters = () => ({
  type: LOAD_FILTERS
})

const clearFilters = () => ({
  type: CLEAR_FILTERS
})

const setFilters = (filters) => ({
  type: SET_SELECTED_FILTERS,
  filters
})

const loadFilteredShoes = (shoes) => ({
  type: LOAD_FILTERED_SHOES,
  shoes
})

// Thunk Actions
export const getLoadFilters = () => async (dispatch) => {
  dispatch(loadFilters())
}

export const getclearFilters = () => async (dispatch) => {
  // Clear localStorage
  localStorage.removeItem('filtered_shoes')
  dispatch(clearFilters())
}

export const setSelectedFilters = (payload) => async (dispatch) => {
  const { size, brand, price } = payload
  
  // Build query parameters
  const params = new URLSearchParams()
  
  if (brand && brand !== 'All Brands') {
    params.append('brand', brand)
  }
  
  if (price && price !== '') {
    // Handle price ranges
    if (price === '650+') {
      params.append('price', '650')
    } else {
      params.append('price', price)
    }
  }
  
  if (size && size !== 'All Sizes') {
    params.append('size', size)
  }

  try {
    const res = await csrfFetch(`/api/shoes/filter?${params.toString()}`)
    
    if (res.ok) {
      const filteredShoes = await res.json()
      
      // Store filtered shoes in localStorage for persistence
      localStorage.setItem('filtered_shoes', JSON.stringify(filteredShoes))
      
      dispatch(loadFilteredShoes(filteredShoes))
      dispatch(setFilters(payload))
      
      return { success: true, shoes: filteredShoes }
    } else {
      throw new Error('Failed to fetch filtered shoes')
    }
  } catch (error) {
    console.error('Filter error:', error)
    return { success: false, error: error.message }
  }
}

// Initial State
const initialState = {
  brand: 'All Brands',
  size: 'All Sizes',
  price: '',
  filteredShoes: null,
  isFiltered: false
}

// Reducer
const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FILTERS:
      return {
        ...state
      }
    case CLEAR_FILTERS:
      return {
        ...initialState,
        filteredShoes: null,
        isFiltered: false
      }
    case SET_SELECTED_FILTERS:
      return {
        ...state,
        ...action.filters,
        isFiltered: true
      }
    case LOAD_FILTERED_SHOES:
      return {
        ...state,
        filteredShoes: action.shoes,
        isFiltered: true
      }
    default:
      return state
  }
}

export default filtersReducer
