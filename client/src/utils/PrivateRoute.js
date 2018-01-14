import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthInterface from './AuthInterface'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ props => (
      AuthInterface.isLoggedIn() ? (
        <Component { ...props } />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
  )} />
)

export default PrivateRoute
