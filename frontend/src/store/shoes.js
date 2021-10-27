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
    if (res.ok) {
        dispatch(loadShoes(data))
        return data
    }
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
    const {sellerId, title, shoeSize, imageFile, price, brand, description} = payload;
    const formData = new FormData()

    // const res = await csrfFetch("/api/shoes/new", {
    //     method: "POST",
    //     header: { "Content-Type": "application/json" },
    //     body: JSON.stringify({payload})
    // })

    // used for aws
    formData.append("sellerId", sellerId);
    formData.append("title", title);
    formData.append("shoeSize", shoeSize);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("description", description);

      // for single file
  if (imageFile) formData.append("image", imageFile);

  const res = await csrfFetch(`/api/shoes/new`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });



    const data = await res.json()
    if (data.ok) {


        dispatch(createShoe(data))
    } else {

        return data
    }
};

export const getEditShoe = (title, shoeSize, image, price, brand, description, shoeId) => async (dispatch) => {
    //* used without aws
    // const res = await csrfFetch(`/api/shoes/${shoeId}`, {
    //     method: "PUT",
    //     header: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title, shoeSize, image, price, brand, description })
    // })

    const formData = new FormData();

    formData.append("title", title);
    formData.append("shoeSize", shoeSize);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("shoeId", shoeId);
    if(image) formData.append("image", image);

    const res = await csrfFetch(`/api/shoes/${shoeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

    const data = await res.json()

    if (data.ok) {
        dispatch(editShoe(data))
    }
    else {
        return data
    }
};

export const getDeletedShoe = (shoeId) => async (dispatch) => {

    const res = await csrfFetch(`/api/shoes/${shoeId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteShoe(data))
        return data
    }
    return
};

const initialState = {};


function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_SHOES:
            return { ...state, ...action.shoes }
        case CREATE_SHOE:
            newState[action.shoe.id] = action.shoe
            return newState
        case EDIT_SHOE:
            state[action.shoe.id] = action.shoe
            return state
        case DELETE_SHOE:
            delete newState[action.shoeId]
            return newState
        default:
            return state
    }
}


export default reducer;
