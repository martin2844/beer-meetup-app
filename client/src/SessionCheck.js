import {useContext, useEffect} from 'react';
import axios from 'axios';
import {UserContext} from './UserContext';

export default function SessionCheck() {
    const [user, setUserData] = useContext(UserContext);
    console.log("log")
    const check = () => {
        axios.get("/api/auth/protected").then((res) => {
            if(res.data === true){
                console.log("Checked Session");
            }
        }).catch(() => {
            console.log("Session Failed, logging out.");
            setUserData( {
                isAuthenticated: null,
                user: {
                    name: '',
                    email:'',
                    isAdmin: '',
                    id: ''
                }
            })
        })
    }
    
    useEffect(() => {
        check();
    }, []);
}



