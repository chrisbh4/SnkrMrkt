import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import sessionSlice from './sessionSlice'
import shoes from '../store/shoes'
import reviews from "./reviews"
import shoppingCart from "./shoppingCart"
import stockXapi from "./stockX"

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import counterReducer from "./counterSlice"
import shoeSlice from './shoeSlice';


// * Redux updated 'Enhancers'
//* ------------------------------------------------------------------
// const middlewares = [ThunkMiddleware]
// const middlewareEnhancer = applyMiddleware(...middlewares)

// const enhancers = [middlewareEnhancer]
// const composeEnhancers = compose(...enhancers)

// const rootReducer = combineReducers({
//   shoes,
//   reviews,
//   shoppingCart,
//   stockXapi
// });
//* ------------------------------------------------------------------

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


export default configureStore({
  reducer: {
    counter: counterReducer,
    session: sessionSlice,
    shoes: shoeSlice,
  },
  middleware: getDefaultMiddleware()
})

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;
