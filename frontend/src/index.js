import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';

//grabs the locally-stored cart and loads all of its items inside the cart
const loadSavedCart = () =>{
  try {
    const cart = localStorage.getItem('cart')
    if(!cart){
      return undefined
    }
    return JSON.parse(cart)
  }catch(err){
    return undefined
  }
};

//sets the state to have a key: of shoppingCart and values of the loaded shoes inside the cart
const savedCart = { shoppingCart: loadSavedCart()}

const store = configureStore(savedCart);

// Testing purposes only
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// const Carrot = () => (
//   <div style={{ color: "orange", fontSize: "100px" }}>
//     <i className="fas fa-carrot"></i>
//   </div>
// );

function Root() {
  return (
    <ChakraProvider>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            {/* <Carrot /> */}
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </ChakraProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
