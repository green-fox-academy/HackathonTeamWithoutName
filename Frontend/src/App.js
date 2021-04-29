import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotImplementedYet, Header, RootRedirect, Main, Login, Register, Prezi, ForgottenPass, ProductDetails } from './components';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={RootRedirect} />
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgottenpass" component={ForgottenPass} />
          <Route path="*" component={NotImplementedYet} />
        </Switch>
        <ProductDetails />
        <Prezi />
      </div>
    </Router>
  );
}

export default App;
