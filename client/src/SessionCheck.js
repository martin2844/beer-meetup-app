import {useContext, useEffect} from 'react';
import axios from 'axios';
import {UserContext} from './UserContext';

export default function SessionCheck() {
    const [user, setUserData] = useContext(UserContext);
    const check = () => {
        axios.get("/api/auth/protected").then((res) => {
            if(res.data === true){
            
            }
        }).catch(() => {
            
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



