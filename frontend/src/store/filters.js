import { csrfFetch } from "./csrf";
import { loadShoes } from "./shoes"
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
    const { size, brand, style, prices } = payload; 
    const res = await csrfFetch(`/api/shoes/filter?size=${size}&brand=${brand}&style=${style}&prices=${prices}`);
    
    if (res.ok) {
        const shoes = await res.json()
        dispatch(setFilter(payload))
        dispatch(loadShoes(shoes))
        const jsonCart = JSON.stringify(shoes)
        localStorage.setItem('filtered_shoes',jsonCart)
        saveFilters(payload)
        return payload
    }
};

export const getclearFilters = ()=> async (dispatch) =>{
    await dispatch(clearFilters())
    const res = await csrfFetch("/api/shoes")
    if (res.ok){
        const shoes = await res.json()
        dispatch(loadShoes(shoes))
        localStorage.removeItem('filters')
        localStorage.removeItem('filtered_shoes')
        return shoes
    }
};

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
