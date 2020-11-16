import React, {useState, createContext} from 'react';


export const UserContext = createContext();


export const UserProvider = (props) => {

  
    const [user, setUserData] = useState( 
        JSON.parse(localStorage.getItem('user')) ||
        
        {
        isAuthenticated: null,
        user: {
            name: '',
            email:'',
            isAdmin: '',
            id: ''
        }
    }

    );


return(
    <UserContext.Provider value={[user, setUserData]}>
        {props.children}
    </UserContext.Provider>
)

}