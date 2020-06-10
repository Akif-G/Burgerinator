import * as actions from '../actions/actions'
const InitialState = {
    orders: [],
    loading: false,
    purchased: false,
}

export const orderReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            }
        case actions.PURCHASE_START:
            return {
                ...state,
                loading: true,
                purchased: false,
            }
        case actions.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
            }
        case actions.PURCHASE_FAIL:
            return {
                ...state,
                loading: false,
            }

        case actions.FETCH_ORDER_START:
            return {
                ...state,
                loading: true,
            }
        case actions.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders:action.orders,
                loading: false,
            }
        case actions.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    }
}