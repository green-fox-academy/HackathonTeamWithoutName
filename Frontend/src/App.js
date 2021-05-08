import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { 
  NotImplementedYet, 
  Header,
  Main, 
  Login, 
  Register, 
  Prezi, 
  ForgottenPass, 
  ProductDetails, 
  MessageModal 
} from './components';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route path="/main" component={Main} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgottenpass" component={ForgottenPass} />
          <Route path="*" component={NotImplementedYet} />
        </Switch>
        <ProductDetails />
        <MessageModal />
        <Prezi />
      </div>
    </Router>
  );
}

export default App;
