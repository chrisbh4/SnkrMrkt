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
        console.log(localStorage)
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
    const data = payload
    //Erase the condtional statment if it's not neeeded
    console.log("Store : ", data)
    if (data) {
        dispatch(setFilter(data))
        saveFilters(payload)
        return data
    }
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
