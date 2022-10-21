import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/HomePage';
import Shop from './pages/ShopPage';
import Detail from './pages/DetailPage';
import Cart from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={Home} />
    </Switch>
  );
}

export default App;
