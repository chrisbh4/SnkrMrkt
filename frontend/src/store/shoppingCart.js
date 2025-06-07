import { csrfFetch } from './csrf'

const LOAD_CART = 'shoppingCart/LOAD_CART'
const ADD_TO_CART = 'shoppingCart/ADD_TO_CART'
const REMOVE_FROM_CART = 'shoppingCart/REMOVE_FROM_CART'
const PURCHASE_CART = 'shoppingCart/PURCHASE'

export const loadCart = (cart) => ({
  type: LOAD_CART,
  cart
})

const removeFromCart = (cartItemId) => ({
  type: REMOVE_FROM_CART,
  cartItemId
})

const purchaseCart = () => ({
  type: PURCHASE_CART
})

const saveCart = (cart) => {
  try {
    const jsonCart = JSON.stringify(cart)
    localStorage.setItem('cart', jsonCart)
  } catch (err) {
    console.error('Error saving cart:', err)
  }
}

// Needs to load the cart on every change
export const getLoadCart = () => async (dispatch) => {
  dispatch(loadCart())
}

export const addShoeToCart = (shoe, cart) => async (dispatch) => {
  if (shoe) {
    // Generate a unique cart item ID that includes the shoe ID, size, and gender
    const cartItemId = `${shoe.id}-${shoe.shoeSize}`

    // Add the shoe with its unique cart item ID
    cart[cartItemId] = {
      cartItemId,
      shoeId: shoe.id,
      title: shoe.title,
      price: shoe.price,
      size: shoe.shoeSize,
      img: shoe.image
    }

    dispatch(loadCart(cart))
    saveCart(cart)
  } else {
    return 'cannot find shoe for cart'
  }
}

export const removeShoeFromCart = (cartItemId, cart) => async (dispatch) => {
  if (cart[cartItemId]) {
    await dispatch(removeFromCart(cartItemId))
    delete cart[cartItemId]
  } else {
    return 'wrong shoe'
  }
  saveCart(cart)
}

export const purchaseFromCart = () => async (dispatch) => {
  await dispatch(purchaseCart())
  localStorage.removeItem('cart')
}

const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return { ...state, ...action.cart }
    case ADD_TO_CART:
      state[action.shoe.cartItemId] = action.shoe
      return { ...state }
    case REMOVE_FROM_CART:
      delete state[action.cartItemId]
      return { ...state }
    case PURCHASE_CART:
      state = {}
      return state
    default:
      return state
  }
}

export default reducer
