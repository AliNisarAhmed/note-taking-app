import * as React from 'react';

const Layout: React.SFC = ({ children }) => (
  <div className="hero valign-wrapper">
    { children }
  </div>
);

export default Layout;