import React, { Fragment, Component } from "react";
import styles from './Modal.css'
import OrderSummary from "../../Burger/Ingredient.js/OrderSummary/OrderSummary";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../../UI/Spinner/Spinner"



class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        /*  */
        console.log(this.props)
        return nextProps.show !== this.props.show || nextProps.loading !==this.props.loading;
    }

    componentWillUpdate() {
    }

    render() {

        let orderSummary =
            <OrderSummary ingredientSummary={this.props.ingredientSummary} purchaseTakeBack={this.props.takeBack} purchaseContinue={this.props.purchaseContinue}
                price={this.props.price}
            />
        if (this.props.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Backdrop show={this.props.show} takeBack={this.props.takeBack}></Backdrop>
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {orderSummary}
                </div>
            </Fragment>
        )
    }
};

export default React.memo(Modal);