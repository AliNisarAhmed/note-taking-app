import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './Layout';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Home from './Home';

import isLoggedIn from '../helperFunctions/isLoggedIn';

interface AppProps {
  history: any
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
          <Route path="/login" exact component={LoginPage} />
          <PrivateRoute path="/home" component={Home} />
        </Router> 
      </Layout>
    );
  }
}

export default App;
