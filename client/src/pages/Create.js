import React, {useContext, useEffect, useState} from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import SessionCheck from '../SessionCheck';
import {UserContext} from '../UserContext';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const [user] = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [submit, setSubmit] = useState(false);
    SessionCheck();
    useEffect(() => {
        if(!user.isAuthenticated && !user.user.isAdmin) {
            setRedirect(true);
        }
    }, [user]);

    const create = async (e) => {
        e.preventDefault();
        console.log("Create")
        let name = e.target.name.value;
        let date = e.target.date.value;
        let obj = {
            name,
            date
        }
        try {
            const createMeetup= await axios.post("/api/meetup/create", obj);
            console.log(createMeetup.data);
            setSubmit(true);
        } catch (error) {
            console.log(error);
        }
     
    }

    // name,
    // date: formatedDate,
    // owner: req.user._id,
    // attendees: [req.user._id]

    return (
     
        <div className="login-form">
            {redirect && <Redirect to='/'/> }
            {submit && <Redirect to='/meetups'/> }
        <Form onSubmit={e => create(e)}>
        <h1>Crear Meetup</h1>
        <FormGroup>
          <Label for="name">Nombre de la Meetup</Label>
          <Input type="text" name="name" id="name" placeholder="Nombre de la Meetup" />
        </FormGroup>
        <FormGroup>
        <Label for="exampleDate">Fecha</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="Elegí una fecha"
        />
      </FormGroup>
        <Button>Submit</Button>
        {alert.alert && <Alert style={{marginTop: "20px", maxWidth: '100%'}} color="danger">{alert.message}</Alert>}
    </Form>
        </div>
    )
}

export default Create
