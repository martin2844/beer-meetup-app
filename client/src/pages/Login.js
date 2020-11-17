import React, {useContext, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import {UserContext} from '../UserContext';
import {Redirect} from 'react-router-dom';

const Login = () => {
    const [user, setUserData] = useContext(UserContext);
    const [alert, setAlert] = useState({
      alert: false,
      message: ""
    }) 
    console.log(alert);
    const [alert2, setAlert2] = useState({
      alert: false,
      message: ""
    }) 
    const [redirect, setRedirect] = useState(false);

    const Login = async (e) => {
      e.preventDefault();
      console.log("Login")
      const user = {
        email: e.target.email.value,
        password: e.target.password.value
      }
      try {
        let auth = await axios.post("/api/auth/login", user);
        if(auth.status === 200) {
          let {name} = auth.data;
          let email = auth.data.user;
          let id = auth.data.id;
          let isAdmin = auth.data.isAdmin
          //Auth user
          setUserData({
            isAuthenticated: true,
            user: {
                name: name,
                email: email,
                id: id,
                isAdmin: isAdmin
            }
        }) 
        setRedirect(true);
        }
      } catch (error) {
        console.log("is this happening?")

        setAlert({
          alert: true,
          message: "Usuario o contraseña incorrecta"
        })

        setTimeout(() => {
          setAlert({
            alert: false,
            message: ""
          })
        }, 2000);
      }
     
    }

    const Register = async (e) => {
      e.preventDefault();
      console.log("Register")
      const user = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        password2: e.target.password2.value
      }
      if(e.target.password.value !== e.target.password2.value) {
        setAlert2({
          alert: true,
          message: "Contraseñas no coinciden"
        })
      }
      let auth = await axios.post("/api/auth/register", user);
      console.log(auth);

      if(auth.status === 200) { 
        let {name} = auth.data;
        let email = auth.data.user;
        let id = auth.data.id;
        let isAdmin = auth.data.isAdmin
        let NewUser = {
          isAuthenticated: true,
          user: {
              name: name,
              email: email,
              id: id,
              isAdmin: isAdmin
          }
      }
        setUserData(NewUser);
      localStorage.setItem('user', JSON.stringify(user));
      setRedirect(true);
      } else {

        setAlert2({
          alert: true,
          message: JSON.stringify(auth.data)
        });

        setTimeout(() => {
          setAlert2({
            alert: false,
            message: ""
          })
        }, 2000);
      }

    }

    return (
        <section className="login-form">
           {redirect && <Redirect to='/'/> }
        <Form onSubmit={e => Login(e)}>
        <h1>Login</h1>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail1" placeholder="email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword1" placeholder="contraseña" />
        </FormGroup>
        <Button>Submit</Button>
        {alert.alert && <Alert style={{marginTop: "20px", maxWidth: '100%'}} color="danger">{alert.message}</Alert>}
    </Form>

    
        <Form onSubmit={e => Register(e)}>
        <h1>Register</h1>
        <FormGroup>
          <Label for="exampleEmail">Nombre</Label>
          <Input type="text" name="name" id="exampleName" placeholder="Nombre" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="contraseña" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Repetí Password</Label>
          <Input type="password" name="password2" id="examplePassword2" placeholder="repeti contraseña" />
        </FormGroup>
        <Button>Submit</Button>
    </Form>
    </section>
    )
}

export default Login
