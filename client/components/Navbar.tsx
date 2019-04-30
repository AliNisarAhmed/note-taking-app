import * as React from 'react';
import AddNote from './AddNote';
import Logout from './Logout';

interface NavbarProps {
  openModal: Function,
  setModalChildren: Function,
}

const Navbar = ({ openModal, setModalChildren }: NavbarProps) => {

  return (
    <div className="navbar-fixed">
      <nav>
        <div id="nav-mobile" className="nav-wrapper">
          <a href="/home" className="brand-logo left">Note</a>
          <ul className="right">
            <li>
              <AddNote openModal={openModal} setModalChildren={setModalChildren}/>
            </li>        
            <li>
              <Logout />
            </li>        
          </ul>
        </div>    
      </nav>
    </div>
  );
};

export default Navbar;