import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './components/Layout';
import {UserProvider} from './UserContext';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Meetup from './pages/Meetup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import {Helmet} from 'react-helmet';

const App = () => {
  return (
    <UserProvider> 
         <Helmet>
        <title>Beerapp</title>
        <meta name="description" content="Challenge Meetups" />
        <meta name="keywords" content="coding challenge, nodejs, react, mongodb, express" />
      </Helmet>
    <Router>
    <Layout>
      <Switch>
       <Route exact path="/">
         <Home />
       </Route>
       <Route exact path="/meetups">
         <Meetup />
       </Route>
       <Route exact path="/login">
         <Login />
       </Route>
       <Route exact path="/logout">
         <Logout />
       </Route>
       </Switch>
       </Layout>
     </Router>
     </UserProvider>
    
  )
}

export default App
