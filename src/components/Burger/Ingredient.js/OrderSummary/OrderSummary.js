import React, { Fragment, Component } from "react";
import styles from './OrderSummary.css'


class OrderSummary extends Component{
    //this componanet actually functional comp..
    componentDidUpdate(){
        console.log('order sumamry will update')
        return this.props.show;
    }

    render(){
    const ingredientSummary = Object.keys(this.props.ingredientSummary)
        .map(igKey => (
            <li key={igKey} style={{ textTransform: 'capitalize' }}>{igKey}:{this.props.ingredientSummary[igKey]}</li>
        ))

    return (
        <Fragment >
            <div className={styles.Grid}>
                <div className={styles.Summary}>
                    <h3>Your Order is Ready</h3>
                    <p>A delicious burger with:</p>
                    <ul >
                        {ingredientSummary}
                    </ul>
                    <p><strong> Total: {this.props.price.toFixed(2)} $  </strong></p>
                </div>
                <button className={[styles.Button, styles.Danger].join(' ')}  onClick={this.props.purchaseTakeBack}>CANCEL</button>
                <button className={[styles.Button, styles.Success].join(' ')} onClick={this.props.purchaseContinue}>Continue</button>
            </div>
        </Fragment>
    )
    }
};
export default OrderSummary;