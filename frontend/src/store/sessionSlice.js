import { csrfFetch } from "./csrf.js";
import { createSlice } from "@reduxjs/toolkit";


export const sessionSlice = createSlice({
  name: 'session',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state = {user: action.payload}
      return state
    },
    removeUser: (state) =>{
      state.user = null
      return state
    },
    //* Test if i can call this create (after update)
    allUsers: (state, action) => {
      state = {...state, ...action.payload}
      return state
    }
  }
})

export const {setUser, removeUser, allUsers} = sessionSlice.actions


export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  if(data.ok){
    dispatch(setUser(data.user));
    return data
  }else{
    return data;
  }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  console.log(data)
  if(response.ok){
    dispatch(setUser(data.user));
    return data;
  }
  return data
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  if( response.ok){
    dispatch(setUser(data.user));
    return data;
  }else{
    return data
  }
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};


export const fetchAllUsers = () => async (dispatch)=>{
  const res = await csrfFetch("/api/session/all-users")

  if(res.ok){
    const data = await res.json()
    dispatch(allUsers(data))
    return data
  }else{
    return res
  }
}




export default sessionSlice.reducer;
