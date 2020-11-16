import React, { useState, useContext, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, ListGroup, ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import {UserContext} from '../UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

const MyNavbar = (props) => {
  const [user] = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [modal, setModal] = useState(false);
  const toggle2 = () => setModal(!modal);
  const location = useLocation();
  const [notCount, setNotCount] = useState(null);

  useEffect(() => {
    if(user.isAuthenticated) {
      axios.get("/api/auth/notification").then((x) => {
        setNotifications(x.data);
      }).catch(x => console.log(x));
    }
  }, [location])

  let filteredNotifications = notifications.filter((not) => {
    return not.isRead === false;
  })

  useEffect(() => {
    setNotCount(filteredNotifications.length);
  }, [filteredNotifications])

  let notMap = filteredNotifications.map((not) => {
    return(
      <ListGroupItem key={not._id}>{not.content}</ListGroupItem>
    )
  })

  const notificationList = (
    <ListGroup>
      {notMap}
    </ListGroup>
  )


  const read = async () => {
    let readIt = await axios.get("/api/auth/readNotifications");
    setNotCount(null);
    setNotifications([]);
    console.log(readIt);
  }
 

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
          {
            user.isAuthenticated ?
          <NavItem style={{cursor: "pointer"}}><NavLink onClick={toggle2}>Notificaciones {notCount ? `(${notCount})` : null}</NavLink></NavItem> 
            : null
          }
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

      <Modal isOpen={modal} toggle={toggle2} className="Class">
        <ModalHeader toggle={toggle2}>Notificaciones</ModalHeader>
        <ModalBody>
          {notificationList}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => read()}>Marcar como leidas</Button>
        </ModalFooter>
      </Modal>  
    </div>
  );
}

export default MyNavbar;