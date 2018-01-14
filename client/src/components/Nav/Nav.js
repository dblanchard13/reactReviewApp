
import React from 'react'
import { Link, Route } from 'react-router-dom'
import AuthInterface from '../../utils/AuthInterface'

const Nav = () => (
  <nav className='navbar navbar-inverse navbar-top'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <Link to='/' className='navbar-brand'>
          Messaging App
        </Link>
      </div>
      {
        AuthInterface.isLoggedIn() ? (
          <Route render={({ history }) => (
              
            <div
              className='navbar-brand pull-right'
              style={{ cursor: 'pointer' }}
              onClick={ () => AuthInterface.logout(history) }
            >
              Logout, { AuthInterface.getUser().username }
            </div>

          )} />
        ) : null
      }
    </div>
  </nav>
)

export default Nav
