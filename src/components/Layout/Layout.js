import React, { Fragment } from 'react';
import style from './Layout.css'


const Layout =(props)=>{
    return (
    <Fragment>
    <div>Toolbar,SideDrawer,Backdrop</div>
    <main className={style.Content}>
        {props.children}
    </main>
    </Fragment>)
};

export default Layout;