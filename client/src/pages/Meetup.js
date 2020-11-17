import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import {UserContext} from '../UserContext';
import SessionCheck from '../SessionCheck';

const Meetup = () => {
    let { id } = useParams();
    const [meetUp, setMeetup] = useState({});
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [beerData, setBeerData] = useState(false);
    const [attendees, setAttendees] = useState([]);
    const [user] = useContext(UserContext);
    SessionCheck();
    useEffect(() => {
        axios.get(`/api/meetup/get/${id}`).then((res) => {
            res.data.date = res.data.date.substr(0, res.data.date.indexOf("T"));
            setMeetup(res.data);
            axios.get(`/api/meetup/getAttendees/${id}`).then((res) => {
                setAttendees(res.data);
            }).catch(x => console.log(x));
            axios.get(`/api/meetup/checkWeather/${id}`).then((res) => {
                setWeather(res.data);
                if(user.user.isAdmin) {
                    console.log("DO BEER LOGIC HERE")
                    axios.get(`/api/meetup/beerAmounts/${id}`).then((res) => {
                        setBeerData(res.data);
                        setTimeout(() => {
                            setLoading(false);
                        }, 500);
                    }).catch(x => console.log(x));
                } else {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
                
            }).catch(x => console.log(x));
        
        
        }).catch(x => console.log(x));
    }, [])

    

    let attend = async () => {
        console.log("attending")
        let rsvp = await axios.post(`/api/meetup/attend/${id}`);
        console.log(rsvp.data);
    }
  
    let attendeesMap;
    if(attendees.length === 1) {
        attendeesMap = attendees.map((at) => {
            return(
                <span key={at}>{at}</span>
            )
        })
    } else { 
        attendeesMap = attendees.map((at) => {
            return(
                <strong key={at}> {at} </strong>
            )
        })
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


    if(user.isAuthenticated && meetUp.name) {
        let filter = meetUp.attendees.filter((x) => {
            return x === user.user.id
        });
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
                   <CardText><strong>Ya estas anotado para esta meetup!</strong></CardText>
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
            <CardText>{attendeesMap}</CardText>
            {forecast}
            {rsvp}
            <br/>
            {beerData ? `Hacen falta 🍺 ${beerData} cajas de cerveza para esta meetup` : null}
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
