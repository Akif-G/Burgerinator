import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route, Redirect } from 'react-router-dom'
import ContactData from "./ContactData/ContactData";
import styles from "./checkout.css"
import { connect } from 'react-redux'

class Checkout extends Component {

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");

    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings && !this.props.purchased)
            summary =
                <div className={styles.Checkout}>
                    <CheckoutSummary ingredients={this.props.ings}
                        CheckoutCancelled={this.CheckoutCancelledHandler}
                        CheckoutContinued={this.CheckoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
        return summary;
    };
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
};



export default connect(mapStateToProps)(Checkout);