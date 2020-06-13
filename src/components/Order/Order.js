import React from 'react';
import styles from './Order.css'
import Burger from '../Burger/Burger.js'
const order=(props)=>{
    console.log(props)
    const ingredients=[];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        });
    }
    let ingredientOutput=ingredients.map(ig=>{
        return (<span 
        style={{textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px'}}
        key={ig.name}>{ig.name} : {ig.amount}</span>)
    })
    return(
    <div className={styles.Order}> 
        <div>
        <p>Ingredients:</p>
        {ingredientOutput}
        </div>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        <Burger className={styles.Burger} ingredients={props.ingredients}/>
    </div>
    )
}
export default order;