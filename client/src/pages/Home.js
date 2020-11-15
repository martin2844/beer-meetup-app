import React from 'react'
import { Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
        <Jumbotron>
          <h1 className="display-3">Hola!</h1>
          <p className="lead">La idea de este front en React, es simplemente exponer a modo práctico la API en Node</p>
          <hr className="my-2" />
          <p>Crea Meetups, a través de este sistema hecho en MERN - Mongo, Express, React y Node (con Redis)</p>
          <p className="lead">
            <Link to="/meetups"><Button color="primary">Ver Meetups</Button></Link>
          </p>
        </Jumbotron>
      </div>
    )
}

export default Home
