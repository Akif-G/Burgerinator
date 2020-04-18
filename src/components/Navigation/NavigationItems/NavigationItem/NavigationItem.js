import React  from 'react';
import styles from './NavigationItem.css'


const navigationItem=(props)=>{
    return(
        <div className={styles.NavigationItem}>
        <a className={props.active? styles.active: null} href={props.link}>{props.children}</a></div>
)};

export default navigationItem;
