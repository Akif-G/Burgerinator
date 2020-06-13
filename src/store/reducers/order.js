import * as actions from '../actions/actions'
import { updateObject } from '../utility';
const InitialState = {
    orders: [],
    loading: false,
    purchased: false,
}

export const orderReducer = (state = InitialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_INIT:
            const updatedPurchased={purchased:false};
            return updateObject(state,updatedPurchased);

        case actions.PURCHASE_START:
            const updateds={loading: true,purchased: false,}
            return updateObject(state,updateds);

        case actions.PURCHASE_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId})
            return updateObject(state,{
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
            });

        case actions.PURCHASE_FAIL:
            return  updateObject(state,{
                loading: false,
            });

        case actions.FETCH_ORDER_START:
            return  updateObject(state,{
                loading: true,
            });

        case actions.FETCH_ORDER_SUCCESS:
            return updateObject(state,{
                orders:action.orders,
                loading: false,
            });
            
        case actions.FETCH_ORDER_FAIL:
            return  updateObject(state,{
                loading: false,
            });

        default:
            return state;
    }
}