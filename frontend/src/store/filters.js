import { csrfFetch } from "./csrf";

const SET_FILTER = 'filters/SET_FILTER';
const LOAD_FILTER = 'filters/LOAD_FILTER';
const CLEAR_FILTERS = 'filters/CLEAR_FILTERS';

const setFilter = (filters) => ({
    type: SET_FILTER,
    filters
});

export const loadFilters = (filters) =>({
    type:LOAD_FILTER,
    filters
})


const saveFilters = (filters) => {
    try{
        const jsonCart = JSON.stringify(filters)
        localStorage.setItem('filters',jsonCart)
    }catch(err){
        return
    }
}

const clearFilters = () =>({
    type:CLEAR_FILTERS,
    
})

//Needs to load the cart on every change
export const getLoadFilters = () => async(dispatch)=>{
    dispatch(loadFilters())
    return
}

export const setSelectedFilters = (payload) => async (dispatch) => {
    // const data = payload
    // const res = await csrfFetch('/api/shoes/filter', { params: payload});
    const { size, brand, style, prices } = payload; // Destructure the payload object
    // const res = await csrfFetch('/api/shoes/filter', { params: { size, brand, style, prices } });
    // const res = await csrfFetch('/api/shoes/filter', {size: size, brand: brand, style: style, prices: prices});
    const res = await csrfFetch(`/api/shoes/filter?size=${size}&brand=${brand}&style=${style}&prices=${prices}`);
    


    console.log("Store : ", payload)
    if (res.ok) {
        dispatch(setFilter(payload))
        saveFilters(payload)
        return payload
    }
};


// export const getAllShoes = () => async (dispatch) => {
//     const res = await csrfFetch('/api/shoes')
//     const data = await res.json()
//     if (res.ok) {
//         dispatch(loadShoes(data))
//         return data
//     }
// };

export const fetchFilteredShoes = (filters) => async (dispatch) => {
    const res = await csrfFetch('/api/shoes/filter', { params: filters});
    if (res.ok){
       const data = await res.json()
        // dispatch(setFilter(data))
        // saveFilters(data)
        return data
    }
  
    return "No filters store"
  };


export const getclearFilters = ()=> async (dispatch) =>{
    await dispatch(clearFilters())
    localStorage.removeItem('filters')
    return
}


const initialState = {size: null, brand: null, style: null, prices: null };

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return { ...action.filters }
        case CLEAR_FILTERS:
            return initialState
        default:
            return state
    }
}


export default reducer;
