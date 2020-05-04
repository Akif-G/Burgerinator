import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout';
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
           {/* <BurgerBuilder/> */}
            {/* <Checkout/> */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
