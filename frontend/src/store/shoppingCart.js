// import { csrfFetch } from "./csrf";
// import { useDispatch } from "react-redux";
const LOAD_CART = 'shoppingCart/LOAD_CART'
const ADD_TO_CART = 'shoppingCart/ADD_TO_CART'
const REMOVE_FROM_CART = 'shoppingCart/REMOVE_FROM_CART'
const PURCHASE_CART = 'shoppingCart/PURCHASE'

export const loadCart = (cart) => ({
  type: LOAD_CART,
  cart
})

const removeFromCart = (shoeId) => ({
  type: REMOVE_FROM_CART,
  shoeId
})

const purchaseCart = () => ({
  type: PURCHASE_CART
})

const saveCart = (cart) => {
  try {
    const jsonCart = JSON.stringify(cart)
    localStorage.setItem('cart', jsonCart)
  } catch (err) {

  }
}

// Needs to load the cart on every change
export const getLoadCart = () => async (dispatch) => {
  dispatch(loadCart())
}

export const addShoeToCart = (shoe, cart) => async (dispatch) => {
  if (shoe) {
    if (shoe.id === cart[shoe.id]) {
      return
    } else {
      cart[shoe.id] = { shoeId: shoe.id, title: shoe.title, price: shoe.price, size: shoe.shoeSize, img: shoe.image }
    }
    dispatch(loadCart(cart))
    //  loadCart(cart)
    saveCart(cart)
  } else {
    return 'cannot find shoe for cart'
  }
}

export const removeShoeFromCart = (shoeId, cart) => async (dispatch) => {
  if (cart[shoeId]) {
    await dispatch(removeFromCart(shoeId))
    delete cart[shoeId]
  } else {
    return 'wrong shoe'
  }
  saveCart(cart)
}

export const purchaseFromCart = () => async (dispatch) => {
  await dispatch(purchaseCart())
  localStorage.removeItem('cart')
}

const initlaState = {}

function reducer (state = initlaState, action) {
  switch (action.type) {
    case LOAD_CART:
      return { ...state, ...action.cart }
    case ADD_TO_CART:
      state[action.shoe.id] = action.shoe
      return { ...state }
    case REMOVE_FROM_CART:
      delete state[action.shoeId]
      return { ...state }
    case PURCHASE_CART:
      state = {}
      return state
    default:
      return state
  }
}

export default reducer
