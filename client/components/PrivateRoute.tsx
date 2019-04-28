import * as React from 'react';
import { Route, Redirect } from 'react-router';
import isLoggedIn from '../helperFunctions/isLoggedIn';

const PrivateRoute = ({ component:Component, ...rest }: { component: React.Component }) => {
  return (
    <Route 
      {...rest}
      render={props => 
        isLoggedIn() ?
        <Component {...props} /> :
        <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;