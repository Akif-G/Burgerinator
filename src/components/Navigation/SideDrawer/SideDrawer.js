import React, { Fragment }  from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo';


const sideDrawer=(props)=>{
    let attachedClasses=[styles.SideDrawer, styles.Close]
    
    if(props.open){
        attachedClasses=[styles.SideDrawer,styles.Open]
    }
    
    return(
        <Fragment>
        <BackDrop show={props.open} takeBack={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <nav >
            <Logo onClick={props.SideDrawerOpened} top={"0"} left={"0%"}/>                <NavigationItems  flexFlow={"column"} isAuth={props.isAuth} />
            </nav>
        </div>
        </Fragment>
    );
}

export default sideDrawer;