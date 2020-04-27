import React, { Fragment, Component } from 'react';
import style from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component{
    state={
        showSideDrawer:false,
    }
    SideDrawerClosed=()=>{
        this.setState({showSideDrawer:false})   
    }
    SideDrawerOpened=()=>{
        this.setState({showSideDrawer:true})   
    }

    render (){
        return(
        <Fragment>
        <Toolbar SideDrawerOpened={this.SideDrawerOpened}></Toolbar>
        <SideDrawer closed={this.SideDrawerClosed}
        open={this.state.showSideDrawer}></SideDrawer>
        <main className={style.Content}>
            {this.props.children}
        </main>
        </Fragment>)
}};

export default Layout;