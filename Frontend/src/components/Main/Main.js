import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Main1, Upload, Cart } from '../';

export const Main = () => {

  return (
    <div>
      <Switch>
        <Redirect exact from="/main" to="/main/main1" />
        <Route path="/main/main1" component={Main1} />
        <Route path="/main/cart" component={Cart} />
        <Route path="/main/upload" component={Upload} />
      </Switch>
    </div>
  );
};