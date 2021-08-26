import { csrfFetch } from "./csrf";

const LOAD_SHOES = 'shoes/LOAD_SHOES';
const CREATE_SHOE = 'shoes/CREATE_SHOE';
const EDIT_SHOE = 'shoes/EDIT_SHOE';
const DELETE_SHOE = 'shoes/DELETE_SHOE';




const loadShoes = (shoes) => ({
    type: LOAD_SHOES,
    shoes
});


const createShoe = (shoe) => ({
    type: CREATE_SHOE,
    shoe
});

const editShoe = (shoeId) => ({
    type: EDIT_SHOE,
    shoeId
});


const deleteShoe = (shoeId) => ({
    type: DELETE_SHOE,
    shoeId
});


export const getAllShoes = () => async (dispatch) => {
    const res = await csrfFetch('/api/shoes')
    const data = await res.json()
    if (data.ok) {
        dispatch(loadShoes(data))
    }
    return data
};

export const getOneShoe = (shoeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/shoes/${shoeId}`)
    const data = await res.json()
    if (data.ok) {
        dispatch(loadShoes(data))
    }
    return data
};

export const getCreatedShoe = (payload) => async (dispatch) => {
    const res = await csrfFetch("/api/shoes/new", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload })
    })
    const data = await res.json()
    if (data.ok) {
        dispatch(createShoe(data))
    }
    return data
};

export const getEditShoe = (payload, shoeId) => async (dispatch)=>{
    const res = await csrfFetch(`/api/shoes/${shoeId}`,{
        method:"PUT",
        header:{"Content-Type": "application/json"},
        body:JSON.stringify({payload})
    })

    const data = await res.json()

    if ( data.ok ) dispatch(editShoe(data))
    return data
};

export const getDeletedShoe = (shoeId) => async (dispatch)=>{
    const res = await csrfFetch(`/api/shoes/${shoeId}`)
    const data = res.json()

    if(data.ok) dispatch(deleteShoe(data))
    return data
};

const initialState = {};


function reducer( state=initialState, action){
    let newState;
    switch(action.type){
        case LOAD_SHOES:
            return {...state,...action.shoes}
        // case CREATE_SHOE
    }
}


export default reducer
