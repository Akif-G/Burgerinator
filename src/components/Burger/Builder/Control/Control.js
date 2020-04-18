import React, { Fragment } from "react";
import styles from './Control.css'

const control =(props)=>{
    return(
        <div className={styles.BuildControl}>
        <div className={styles.Label}>
            {props.label}
        </div>
        <button className={styles.More} onClick={props.add}>+</button>  
        <button className={styles.Less}  onClick={props.remove}>-</button>  
        </div>
    )
}

export default control