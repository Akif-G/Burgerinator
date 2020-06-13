import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Social from './components/UI/Social/Social';

const asyncCheckout =asyncComponent(()=>{
  return import('./containers/checkout/checkout')
})

const asyncOrders =asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncAuth =asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" exact component={asyncOrders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
          <Social></Social>
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
