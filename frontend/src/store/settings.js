import { csrfFetch } from './csrf'

const LOAD = 'settings/LOAD'
const LOAD_ORDER_SUMMARY = 'settings/LOAD_ORDER_SUMMARY'
const CLEAR_ORDER_SUMMARY = 'settings/CLEAR_ORDER_SUMMARY'

const loadUsersSellingList = (data) => ({
  type: LOAD,
  data
})

const loadUsersOrdersList = (data) => ({
  type: LOAD,
  data
})

const loadOrderSummary = (data) => ({
  type: LOAD_ORDER_SUMMARY,
  data
})

const clearOrderSummary = () => ({
  type: CLEAR_ORDER_SUMMARY
})

export const fetchUserSellingList = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/settings/${userId}/selling`)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUsersSellingList(data))
    return data
  }
}

export const fetchUsersWatchingList = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/settings/${userId}/watching`)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUsersOrdersList(data))
    return data
  }
}

export const fetchUsersOrdersList = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/settings/${userId}/orders`)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUsersOrdersList(data))
    return data
  }
}

export const fetchOrderSummary = (userId, orderId) => async (dispatch) => {
  // Clear previous order summary data first
  dispatch(clearOrderSummary())
  
  const res = await csrfFetch(`/api/settings/${userId}/orders/${orderId}/summary`)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadOrderSummary(data))
    return data
  } else {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to fetch order summary')
  }
}

export const clearOrderSummaryData = () => async (dispatch) => {
  dispatch(clearOrderSummary())
}

// export const fetchCreateNewOrder = (payload) => async (dispatch) => {

//     const {username, email, nameOnCard, cardNumber, expirationDate, cvvNumber, firstName, lastName, company, address,
//            otherAddress, city, country, stateProvince, postalCode, phoneNumber, shoeIds} = payload;
//     const res = await csrfFetch('/api/orders/new', {
//         method: "POST",
//         header: { "Content-Type": "application/json" },
//         body: JSON.stringify({username, email, nameOnCard, cardNumber, expirationDate, cvvNumber, firstName, lastName, company, address,
//             otherAddress, city, country, stateProvince, postalCode, phoneNumber, shoeIds})
//     })

//     const data = await res.json()
//     if (res.ok) {
//         dispatch(createNewOrder(payload))
//         return data
//     }else{
//         return data
//     }
// }

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, ...action.data }
    case LOAD_ORDER_SUMMARY:
      return { ...state, orderSummary: action.data.order }
    case CLEAR_ORDER_SUMMARY:
      return { ...state, orderSummary: null }
    default:
      return state
  }
}

export default reducer
