import { csrfFetch } from "./csrf";

const SET_FILTER = 'filters/SET_FILTER';

export const setUserFilters = () => async (dispatch) => {
    const res = await csrfFetch('/api/shoes')
    const data = await res.json()
    if (res.ok) {
        // dispatch(loadShoes(data))
        return data
    }
};


const initialState = {size: null, brand: null, style: null, prices: null };

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return { ...state, ...action.shoes }
        default:
            return state
    }
}


export default reducer;
