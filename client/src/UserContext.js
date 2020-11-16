import React, {useState, createContext} from 'react';
import axios from 'axios';

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

//gooogle login
// if(localStorage.getItem('user')){
//    if (JSON.parse(localStorage.getItem('user')).isAuthenticated === null) {
//     axios.get('api/users/user')
//   .then(function (response) { 
//       if (response.data) {
//         let {name, email, carrera, bio, date, avatar, _id} = response.data
//         setUserData(   {
//             token: response.data.token,
//             isAuthenticated: true,
//             loading: true,
//             errors: {},
//             user: {
//                 name: name,
//                 email: email,
//                 carrera: carrera,
//                 bio: bio,
//                 date: date,
//                 avatar: avatar,
//                 id: _id
//             }
//         })  
//       }
//     // handle success
//     //console.log(response.data);
//     localStorage.setItem('user', JSON.stringify(user));

//   }).catch((err)=>{ /*console.log('No user loaded yet', err) */});

// }
// }

return(
    <UserContext.Provider value={[user, setUserData]}>
        {props.children}
    </UserContext.Provider>
)

}