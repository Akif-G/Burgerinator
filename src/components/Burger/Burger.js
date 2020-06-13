import React,{ Fragment } from "react";
import styles from './Burger.css'
import Ingredient from "./Ingredient.js/Ingredient";

const burger =(props)=>{
    let meta=Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                    return  <Ingredient key={igKey+i} type={igKey}/>
            });
        })
        .reduce((arr,el)=>arr.concat(el),[]);


    if(meta.length===0){
        meta=<div className={styles.P}>please start adding ingredients</div>
    }
        return(
        <div className={styles.Burger}>
        <Ingredient type="bread-top"/>
        {meta}
        <Ingredient type="bread-bottom"/>
        </div>

    );

};

export default burger;