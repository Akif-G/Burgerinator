import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Orders.css"

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render() {
        let loading = <Spinner />;
        if (!this.props.loading) loading = <div className={styles.Orders}>
            {this.props.orders.map(order => (
                <Order key={order.id} 
                className={styles.Order}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))}
        </div>
        return loading;
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);