import React  from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar=(props )=>{
    return(
        <header className={styles.Toolbar}>
            <div className={styles.Menu} onClick={props.SideDrawerOpened}>MENU</div>
            <Logo  top={"0"} left={"0%"}></Logo>
            <nav
            className={styles.DesktopOnly}><NavigationItems isAuth={props.isAuth}/></nav>
        </header>
    )
};

export default toolbar;