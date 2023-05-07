import { csrfFetch } from "./csrf";

const SET_FILTER = 'filters/SET_FILTER';

const setFilter = (filters) => ({
    type: SET_FILTER,
    filters
});

export const setSelectedFilters = (payload) => async (dispatch) => {
    const data = payload
    console.log("Store : ", data)
    if (data) {
        dispatch(setFilter(data))
        return data
    }
};


const initialState = {size: null, brand: null, style: null, prices: null };

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return { ...action.filters }
        default:
            return state
    }
}


export default reducer;
