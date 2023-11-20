import { csrfFetch } from './csrf'

const ORDER_CREATED = 'orders/ORDER_CREATED'
const GET_ORDER_ID = 'orders/GET_ORDER_ID'

const createNewOrder = (order_form) => ({
  type: ORDER_CREATED,
  order_form
})

const getOrderInvoice = (order_form) => ({
  type: GET_ORDER_ID,
  order_form
})

export const fetchOrderByID = (orderId) => async (dispatch) => {
  const res = await csrfFetch(`/api/orders/${orderId}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getOrderInvoice(orderId))
    return data
  }
}

export const fetchCreateNewOrder = (payload) => async (dispatch) => {
  const {
    username, buyerId, email, nameOnCard, cardNumber, expirationDate, cvvNumber, firstName, lastName, company, address,
    otherAddress, city, country, stateProvince, postalCode, phoneNumber, shoeIds, totalAmount
  } = payload
  const res = await csrfFetch('/api/orders/new', {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      buyerId,
      email,
      nameOnCard,
      cardNumber,
      expirationDate,
      cvvNumber,
      firstName,
      lastName,
      company,
      address,
      otherAddress,
      city,
      country,
      stateProvince,
      postalCode,
      phoneNumber,
      shoeIds,
      totalAmount
    })
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(createNewOrder(payload))
    return data
  } else {
    return data
  }
}

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ORDER_CREATED:
      return { ...action.order_form }
    case GET_ORDER_ID:
      return { ...action.order_form }
    default:
      return state
  }
}

export default reducer
