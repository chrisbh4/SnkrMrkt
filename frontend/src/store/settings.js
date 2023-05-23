import { csrfFetch } from "./csrf";

const LOAD = 'settings/LOAD';

const loadUserSellingList = (selling) => ({
    type: LOAD,
    selling
});



export const fetchUserSellingList = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/settings/${userId}/selling`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserSellingList(data))
        return data
    }
    return
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




const initialState = {};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return {...action.selling }
        default:
            return state

    }
}



export default reducer;
