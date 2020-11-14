import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const Login = () => {

    const Login = (e) => {
      e.preventDefault();
      console.log("Login")
    }

    const Register = (e) => {
      e.preventDefault();
      console.log("Register")
    }


    return (
        <section className="login-form">
        <Form onSubmit={e => Login(e)}>
        <h1>Login</h1>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="contraseña" />
        </FormGroup>
        <Button>Submit</Button>
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
