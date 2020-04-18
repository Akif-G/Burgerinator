import React, { Fragment, Component } from "react";
import styles from './Modal.css'
import OrderSummary from "../../Burger/Ingredient.js/OrderSummary/OrderSummary";
import Backdrop from "../Backdrop/Backdrop";


class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        /*  */
        return nextProps.show!==this.props.show;
    }

    componentWillUpdate(){
        console.log('modal yes')
    }

    render(){
    return(
        <Fragment>
        <Backdrop show={this.props.show} takeBack={this.props.takeBack}></Backdrop>
    <div
        className={styles.Modal} 
        style={{
            transform:this.props.show? 'translateY(0)':'translateY(-100vh)',
            opacity:this.props.show?'1':'0',
        }}>
        <OrderSummary ingredientSummary={this.props.ingredientSummary} purchaseTakeBack={this.props.takeBack} purchaseContinue={this.props.purchaseContinue}
            price={this.props.price} 
        />

    </div>

    </Fragment>
    )
    }
};

export default React.memo(Modal);