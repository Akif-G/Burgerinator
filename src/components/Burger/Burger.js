import React,{ Fragment } from "react";
import styles from './Burger.css'
import Ingredient from "./Ingredient.js/Ingredient";

const burger =(props)=>{
    return(
        <div className={styles.Burger}>
        <Ingredient type="bread-top"/>
        <Ingredient type="cheese"/>
        <Ingredient type="meat"/>
        <Ingredient type="salad"/>
        <Ingredient type="bread-bottom"/>

        </div>

    );

};

export default burger;