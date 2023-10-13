import { csrfFetch } from "./csrf.js";
import { getclearFilters } from "./filters.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ALL_USERS = 'session/all_users';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});
const allUsers = (users) => ({
  type: ALL_USERS,
   users,
});


let logoutTimer;

const startLogoutTimer = (expirationTime) => (dispatch) => {
  logoutTimer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

const clearLogoutTimer = () => {
  clearTimeout(logoutTimer);
};

export const login = ({ credential, password }) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(setUser(data.user));
    const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    dispatch(startLogoutTimer(expirationTime)); // Start the logout timer
    return data;
  } else {
    return data;
  }
};

export const logout = () => async (dispatch) => {
  clearLogoutTimer();
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  dispatch(getclearFilters())
  return response;
};


export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
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

//* Login without set timed auto logout
// export const login = ({ credential, password }) => async dispatch => {
//   const response = await csrfFetch("/api/session", {
//     method: "POST",
//     body: JSON.stringify({ credential, password }),
//   });
//   const data = await response.json();
//   if(response.ok){
//     dispatch(setUser(data.user));
//     return data
//   }else{
//     return data;
//   }
// };

// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch("/api/session", {
//     method: "DELETE",
//   });
//   dispatch(removeUser());
//   return response;
// };





const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ALL_USERS:
      return {...state, ...action.users}
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
