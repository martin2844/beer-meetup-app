import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom'
import {UserContext} from '../UserContext';

const MyNavbar = (props) => {
  const [user] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link}  to='/'>🍺Birrapp</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink  tag={Link}  to='/meetups' >Meetups</NavLink>
            </NavItem>
            {user.user.isAdmin ?  <NavItem>
              <NavLink tag={Link} to="/create">Crear Meetup</NavLink>
            </NavItem> : null}
            <NavItem>
              <NavLink href="https://github.com/martin2844">GitHub</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
          <NavItem>
             {
               user.isAuthenticated ? 
               <NavLink  tag={Link} to='/logout'>Logout</NavLink> : 
               <NavLink  tag={Link} to='/login'>Login</NavLink>
             }
              
          </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;