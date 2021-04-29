import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Upload, Cart, OrderReview,LandingPage, ProductFeed } from '../';

export const Main = () => {

  return (
    <div id="main">
      <Switch>
        <Redirect exact from="/main" to="/main/landingpage" />
        <Route path="/main/landingpage" component={LandingPage} />
        <Route path="/main/shop" component={ProductFeed} />
        <Route path="/main/cart" component={Cart} />
        <Route path="/main/orderreview" component={OrderReview} />
        <Route path="/main/upload" component={Upload} />
      </Switch>
    </div>
  );
};