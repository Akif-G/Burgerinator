import React from "react";
import styles from "./CheckoutSummary.css"
import Burger from "../../Burger/Burger";
import buttonstyle from "../../Burger/Ingredient.js/OrderSummary/OrderSummary.css"

const CheckoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <button className={[buttonstyle.Button, buttonstyle.Success].join(' ')}
            onClick={props.CheckoutContinued} 
            >Continue</button>

            <button className={[buttonstyle.Button, buttonstyle.Danger]
            .join(' ')}
            onClick={props.CheckoutCancelled} 
            >Cancel</button>
        </div>
    )

}

export default CheckoutSummary;