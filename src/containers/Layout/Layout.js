import React, { Fragment, Component } from 'react';
import style from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


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
        <Toolbar isAuth={this.props.isAuth} SideDrawerOpened={this.SideDrawerOpened}></Toolbar>
        <SideDrawer isAuth={this.props.isAuth}  closed={this.SideDrawerClosed}
        open={this.state.showSideDrawer}></SideDrawer>
        <main className={style.Content}>
            {this.props.children}
        </main>
        </Fragment>)
}};

const mapStateToProps =state=>{
    return{
        isAuth:state.auth.token!==null,

    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (email, password,isSignin) => dispatch(actions.auth(email, password,isSignin))
//     };
// }

export default connect(mapStateToProps)(Layout);