import { csrfFetch } from './csrf'
import { loadShoes } from './shoes'

// Action Types
const LOAD_FILTERS = 'filters/LOAD_FILTERS'
const CLEAR_FILTERS = 'filters/CLEAR_FILTERS'
const SET_SELECTED_FILTERS = 'filters/SET_SELECTED_FILTERS'

// Action Creators
export const getLoadFilters = () => ({
  type: LOAD_FILTERS
})

export const getclearFilters = () => ({
  type: CLEAR_FILTERS
})

export const setSelectedFilters = (filters) => ({
  type: SET_SELECTED_FILTERS,
  filters
})

// Initial State
const initialState = {
  brand: { id: 0, title: 'All Brands' },
  size: { id: 0, size: 'All Sizes', category: 'men' },
  priceRange: { min: 0, max: 1000 }
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
        ...initialState
      }
    case SET_SELECTED_FILTERS:
      return {
        ...state,
        ...action.filters
      }
    default:
      return state
  }
}

export default filtersReducer
