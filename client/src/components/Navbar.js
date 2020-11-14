import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom'

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

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
            <NavItem>
              <NavLink href="https://github.com/martin2844">GitHub</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
          <NavItem>
              <NavLink  tag={Link} to='/login'>Login</NavLink>
          </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;