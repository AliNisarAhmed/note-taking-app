import * as React from 'react';

import removeToken from '../helperFunctions/removeToken';
import { withRouter } from 'react-router';

const Logout = ({ history }) => {
  
  function handleLogout () {
    removeToken();
    history.push('/');  
  }
  
  return (
    <a href="/" className="link" onClick={handleLogout}>Logout</a>
  );
};


export default withRouter(Logout);