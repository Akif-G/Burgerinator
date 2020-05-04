import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ingredient from "../../components/Burger/Ingredient.js/Ingredient";
import { Route } from 'react-router-dom'
import ContactData from "./ContactData/ContactData";


class Checkout extends Component {

    state = {
        ingredients: null,
        price:0
    }

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");

    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let Price=0;

        for (let param of query.entries()) {
            //['salad','1']
            if(param[0]=='price') Price=param[1];
            else    ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients, price:Price })
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    CheckoutCancelled={this.CheckoutCancelledHandler}
                    CheckoutContinued={this.CheckoutContinuedHandler}
                />
                <Route path={this.props.match.path+ '/contact-data'} render={(props)=>(<ContactData ingredients={this.state.ingredients}     price={this.state.price}    {...props}/>)}/>
            </div>
        )
    };

}

export default Checkout;