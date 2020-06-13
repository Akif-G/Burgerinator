import React  from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar=(props )=>{
    return(
        <header className={styles.Toolbar}>
            <div onClick={props.SideDrawerOpened}>MENU</div>
            <Logo top={"0"} right={"50%"}></Logo>
            <nav
            className={styles.DesktopOnly}><NavigationItems isAuth={props.isAuth}/></nav>
        </header>
    )
};

export default toolbar;