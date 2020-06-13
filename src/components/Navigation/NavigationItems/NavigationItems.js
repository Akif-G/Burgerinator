import React  from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.css'
const navigationItems=(props)=>(
    <ul className={styles.NavigationItems} style={{flexFlow:props.flexFlow}}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuth? <NavigationItem link="/orders">Orders</NavigationItem>:null}
        {!props.isAuth? <NavigationItem link="/auth" >Log in</NavigationItem> : <NavigationItem link="/logout" >Log Out</NavigationItem>}
    </ul>
)

export default navigationItems;
