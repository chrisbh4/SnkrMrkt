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
    //* Test if i can call this create (after update)
    createShoe: (state, action) => {
      state = {...state, ...action.payload}
      return state
    },
    editShoe: (state, action) => {
      state[action.shoe.id] = action.shoe
      return state
    },
    deleteShoe: (state, action) => {
      delete state[action.shoeId]
      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadAllShoes, loadShoeById, createShoe, editShoe, deleteShoe } = shoeSlice.actions


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


export const getCreatedShoe = (payload) => async (dispatch) => {
  const {sellerId, title, shoeSize, imageFile, price, brand, description} = payload;
  const formData = new FormData()
  //* used when application wasn't using AWS or having files uploaded
  // const res = await csrfFetch("/api/shoes/new", {
  //     method: "POST",
  //     header: { "Content-Type": "application/json" },
  //     body: JSON.stringify({payload})
  // })

  //* used for aws
  formData.append("sellerId", sellerId);
  formData.append("title", title);
  formData.append("shoeSize", shoeSize);
  formData.append("price", price);
  formData.append("brand", brand);
  formData.append("description", description);

    //* for single file
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
  //* used when application wasn't using AWS or having files uploaded
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

export default shoeSlice.reducer
