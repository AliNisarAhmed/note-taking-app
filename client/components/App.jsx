import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
export default class App extends React.Component {
    render() {
        return (<Layout>
        <Router>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/login" exact component={LoginPage}/>
          <PrivateRoute component={Home}/>
        </Router>
      </Layout>);
    }
}
