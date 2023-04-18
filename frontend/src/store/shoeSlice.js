import { createSlice } from '@reduxjs/toolkit'
import { csrfFetch } from './csrf'

export const shoeSlice = createSlice({
  name: 'shoes',
  initialState: {},
  reducers: {
    loadAllShoes: (state, action) => {
      state = action.payload
      return state
    },
    loadShoeById: (state, action) =>{
        state = action.payload
        return state
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadAllShoes, loadShoeById, decrement, incrementByAmount } = shoeSlice.actions



export const getAllShoes = () => async (dispatch) => {
    const res = await csrfFetch('/api/shoes')
    const data = await res.json()
    if (res.ok) {
        dispatch(loadAllShoes(data))
        return data
    }
};

export const getOneShoe = (shoeId) => async (dispatch) => {
    console.log("STORE: ", shoeId)
    const res = await csrfFetch(`/api/shoes/${shoeId}`)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
        dispatch(loadShoeById(data))
        return data
    }
    return data
};


export default shoeSlice.reducer
