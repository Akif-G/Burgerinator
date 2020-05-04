import React from 'react';
import styles from './NavigationItem.css'
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => {
    return (
        <div className={styles.NavigationItem}>
            <NavLink activeClassName={styles.active} to={props.link} exact>{props.children}</NavLink>
        </div>
    )
};

export default navigationItem;
