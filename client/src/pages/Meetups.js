import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import {Link} from 'react-router-dom'
const Meetups = () => {
    
    
    const [meetups, setMeetups] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const populate = async () => {
        let meetupRequest = await axios.get("/api/meetup/getAll");
        meetupRequest.data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.date) - new Date(b.date);
          });
        setMeetups(meetupRequest.data);
        setTimeout(() => {
            setLoading(false);
        }, 200);
        } 
        populate();
        
    }, [])
  
    const Cards = meetups.map((m) => {
        let formatDate = m.date.substr(0, m.date.indexOf("T"));
        return(
        <Card key={m._id} body>
            <CardTitle tag="h5">{m.name}</CardTitle>
            <CardText>Fecha: {formatDate}</CardText>
            <CardText>Gente Confirmada: {m.attendees.length}</CardText>
            <Link to={`/meetups/${m._id}`}><Button>Ver más Info</Button></Link>
          </Card>
        )
    } )

    return (
        <div>
            <h1>Meetups</h1>
            <br></br>
            <div className="card-container">
            {loading ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : [Cards]}
            </div>
          
        </div>
    )
}

export default Meetups
