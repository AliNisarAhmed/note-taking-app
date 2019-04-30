import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './Layout';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import RegisterPage from './RegisterPage';

import isLoggedIn from '../helperFunctions/isLoggedIn';

interface AppProps {
  history: History
}

class App extends React.Component<AppProps, {}> {

  
  render() {
    return (
      <Layout>
        <Router>
          <Route path="/" exact render={() => (
            isLoggedIn() ?
            <Redirect to="/home" /> :
            <LandingPage />
          )}/>
          <Route path="/login" exact render={() => (
            isLoggedIn() ?
            <Redirect to="/home" /> :
            <LoginPage />
          )} />
          <Route path="/register" exact render={() => (
            isLoggedIn() ?
            <Redirect to="/home" /> :
            <RegisterPage />
          )} />
          <PrivateRoute path="/home" component={Home} />
        </Router> 
      </Layout>
    );
  }
}

export default App;
