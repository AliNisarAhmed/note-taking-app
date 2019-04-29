import * as React from 'react';

import removeToken from '../helperFunctions/removeToken';
import { withRouter } from 'react-router';

const Logout = ({ history }) => {
  
  function handleLogout () {
    removeToken();
    history.push('/');  
  }
  
  return (
    <button onClick={handleLogout}>Logout</button>
  );
};


export default withRouter(Logout);