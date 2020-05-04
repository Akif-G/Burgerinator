import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        let fetchedOrders = []
        axios.get('/orders.json')
            .then(res => {
                console.log(res)
                for (let key in res.data) {
                    fetchedOrders.push(
                        {
                            ...res.data[key],
                            id: key,
                        }
                    )
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })

            .then(() => console.log(this.state.orders))
            .catch(err => {
                this.setState({ loading: false, orders: fetchedOrders });
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order =>(
                    <Order key={order.id}
                        ingredients={order.ingridients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default Orders;