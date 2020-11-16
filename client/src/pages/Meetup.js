import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import {UserContext} from '../UserContext';

const Meetup = () => {
    let { id } = useParams();
    const [meetUp, setMeetup] = useState({});
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [user] = useContext(UserContext);

    useEffect(() => {
        axios.get(`/api/meetup/get/${id}`).then((res) => {
            res.data.date = res.data.date.substr(0, res.data.date.indexOf("T"));
            setMeetup(res.data);
            axios.get(`/api/meetup/checkWeather/${id}`).then((res) => {
                setWeather(res.data);
            }).catch(x => console.log(x));
            if(user.user.isAdmin) {
                console.log("DO BEER LOGIC HERE")
            }
            setLoading(false);
        }).catch(x => console.log(x));
    }, [])

    let attend = async () => {
        console.log("attending")
        let rsvp = axios.post(`/api/meetup/attend/${id}`);
        console.log(rsvp.data);

    }

    let card;
    let forecast;
    let rsvp;
    if(weather.temp) {
        forecast = (
            <div style={{backgroundColor: "#f8f9fa"}}>
            <CardText>Va haber una máxima de {weather.temp.max}°C</CardText>
            <CardText>y una minima de {weather.temp.min}°C</CardText>
            <CardText>Estado general: {weather.weather[0].description}</CardText>
            </div>
        )
    }
    console.log(meetUp)
    if(user.isAuthenticated && meetUp.name) {
        let isRsvp;
        let filter = meetUp.attendees.filter((x) => {
            return x === user.user.id
        });
        console.log(filter);
        if(filter.length === 0){
            rsvp = (
                <>
                <br/> 
                   <Button onClick={() => attend()}>Anotate para la meetup</Button>
                </>
            )
        } else {
            rsvp = (
                <>  
                <br/> 
                   <CardText><h6>Ya estas anotado para esta meetup!</h6></CardText>
                </>
            )
        }
      
    }
    if(meetUp.name) {
        card = (
            <Card body>
            <CardTitle tag="h5">{meetUp.name}</CardTitle>
            <CardText>Fecha: {meetUp.date}</CardText>
            <CardText>Gente Confirmada: {meetUp.attendees.length}</CardText>
            {forecast}
            {rsvp}
          </Card>
        )
    }


    console.log(user);
  

    return (
        <section className="card-container">
            {loading ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : card}
        </section>
    )
}

export default Meetup
