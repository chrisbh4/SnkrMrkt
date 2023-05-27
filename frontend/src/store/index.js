import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import shoes from '../store/shoes'
import reviews from "./reviews"
import shoppingCart from "./shoppingCart"
import stockXapi from "./stockX"
import orders from "./orders"
import filters from "./filters"
import settings from "./settings"



const rootReducer = combineReducers({
  session,
  shoes,
  reviews,
  shoppingCart,
  stockXapi,
  orders,
  filters,
  settings
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

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
