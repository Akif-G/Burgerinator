import React, { Fragment } from "react";
import styles from './Builder.css'
import Control from "./Control/Control";

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},

]

const builder = (props) => {
    return(
        <div className={styles.Builder}>
            <h1>price: {props.price.toFixed(2)}</h1>
            {controls.map(ctrl=>(
                <Control
                    key={ctrl.label} label={ctrl.label}
                    add={()=>props.add(ctrl.type)}
                    remove={()=>props.remove(ctrl.type)}
                />
                ))
                
            }
           <button className={styles.OrderButton} 
           onClick={props.purchased}
           disabled={!props.purchaseable}
           >{props.isAuth?"Purchase":"Sign In and Continue!"}</button> 
        </div>
    )
}


export default builder;