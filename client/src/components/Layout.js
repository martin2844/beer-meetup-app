import React from 'react'
import Navbar from './Navbar.js'
const Layout = (props) => {
    return (
        <>
            <Navbar />
            <section className="main" >
                  {props.children}
            </section>
          
        </>
    )
}

export default Layout
