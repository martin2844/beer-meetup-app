import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './components/Layout';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Meetup from './pages/Meetup';
import Login from './pages/Login';

const App = () => {
  return (
    <>
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
       </Switch>
       </Layout>
     </Router>
     
    </>
  )
}

export default App
