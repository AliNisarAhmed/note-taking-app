import * as React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="container landing">
    <div className="landing--title">
      <h1 className="center-align">Note App</h1>
      <h3 className="center-align">Save your notes, anytime, anywhere</h3>
    </div>
    <div className="landing--button">
      <Link to="/register" className="btn-large waves-effect waves-light center-align">Get Started</Link>
      <p className="center-align">Already have an account? <Link to="/login" className="link center-align">Log in</Link></p>   
    </div> 
  </div>
);

export default LandingPage;