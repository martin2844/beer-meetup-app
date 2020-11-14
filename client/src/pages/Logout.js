import React, {useState, useEffect, useContext} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../UserContext';

const Logout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [user, setUserData] = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/auth/logout").then((x) => {
            console.log(x);
            console.log("then")
            setLoggedOut(true);
            setUserData({
                isAuthenticated: false,
                user: {
                    name: '',
                    email: ''
                }
            })
        })

    }, [])


    return (
        <div>
            {loggedOut && <Redirect to='/'/> }
            
        </div>
    )
}

export default Logout
