import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import shoes from '../store/shoes'
import reviews from "./reviews"
import shoppingCart from "./shoppingCart"
import stockXapi from "./stockX"

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import counterReducer from "./counterSlice"
import shoeSlice from './shoeSlice';





const rootReducer = combineReducers({
  session,
  shoes,
  reviews,
  shoppingCart,
  stockXapi
});

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
    shoes: shoeSlice,
    middleware: {enhancer}
  }
})

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;
