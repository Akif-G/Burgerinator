import React  from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar=(props )=>{
    return(
        <header className={styles.Toolbar}>
            <div onClick={props.SideDrawerOpened}>MENU</div>
            <Logo top={"0"}></Logo>
            <nav
            className={styles.DesktopOnly}><NavigationItems/></nav>
        </header>
    )
};

export default toolbar;