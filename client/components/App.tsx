import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './Layout';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

export default class App extends React.Component<{}, {}> {
  
  render() {
    return (
      <Layout>
        <Router>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/login" exact component={LoginPage} />
        </Router>
      </Layout>
    );
  }
}
