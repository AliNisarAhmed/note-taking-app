import * as React from 'react';
import { Link } from 'react-router-dom';
const LandingPage = () => (<div>
    <h1>Note App</h1>
    <h2>Welcome, Please log in or Register to use</h2>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>);
export default LandingPage;
