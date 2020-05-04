import React, { Component } from "react";
import buttonstyle from "../../../components/Burger/Ingredient.js/OrderSummary/OrderSummary.css"
import uuidv4 from 'uuid/v4';
import axios from '../../../axios-orders'
import styles from "./ContactData.css"
import Spinner from "../../../components/UI/Spinner/Spinner";


const ID=uuidv4()

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',

        },
        price: 0,

    }
    orderHandler = (event) => {
        //it is importante since forms are sending request and reloads page
        this.setState({ loading: true });
        const order = {
            ingridients: this.props.ingredients, price: this.props.price,
            customerID: ID,
        };
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res)
                this.setState({ loading: false, })
                this.props.history.push('/')
            })
            .catch(err => { this.setState({ loading: false, }) });

        event.preventDefault();
    }
    render() {
        let form = (
        <form >
            <input className={styles.Input} type="text" name="name" placeholder="Your name" />
            <input className={styles.Input} type="text" name="email" placeholder="Your email" />
            <input className={styles.Input} type="text" name="street" placeholder="Your street" />
            <input className={styles.Input} type="text" name="postal code" placeholder="Your postal code" />
            <button className={[buttonstyle.Button, buttonstyle.Success].join(' ')}
                onClick={this.orderHandler}
            >Order</button>
        </form>
        );

        if (this.state.loading) form = <Spinner></Spinner>
        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;