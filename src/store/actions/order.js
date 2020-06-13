import * as  actions from './actions'
import axios from '../../axios-orders'


export const purchaseSuccess = (id, orderData) => {
    return {
        type: actions.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}
export const purchaseFail = (err) => {
    return {
        type: actions.PURCHASE_SUCCESS,
        error: err,
    }
}

export const purchaseStart = (orderData) => {

    return {
        type: actions.PURCHASE_START,
    };
}
export const orderInit = () => {
    return {
        type: actions.ORDER_INIT,
    };
}

export const purchaseBurger = (orderData,TOKEN) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json?auth='+TOKEN, orderData)
            .then(res => {
                dispatch(purchaseSuccess(res.data.name, orderData));
                console.log(res.data)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
                dispatch(purchaseFail(err))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT,
    };
}



export const fetchOrdersStart = () => {
    return {
        type: actions.FETCH_ORDER_START,
    }
}
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actions.FETCH_ORDER_SUCCESS,
        orders: orders,
    }
}
export const fetchOrdersFail = (err) => {
    return {
        type: actions.FETCH_ORDER_FAIL,
        error: err,
    }
}

export const fetchOrders = (token,userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        let fetchedOrders = []
        const query='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+query)
            .then(res => {
                for (let key in res.data) {
                    fetchedOrders.push(
                        {
                            ...res.data[key],
                            id: key,
                        }
                    )
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })

            .then(() => console.log(this.state.orders))
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}