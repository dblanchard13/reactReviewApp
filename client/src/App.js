
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Conversations from './pages/Conversations'
import CreateConversation from './pages/CreateConversation'
import Auth from './pages/Auth'
import NoMatch from './pages/NoMatch'
import Nav from './components/Nav'
import PrivateRoute from './utils/PrivateRoute'

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>

        <Route exact path='/login' component={ Auth } />

        <PrivateRoute exact path='/' component={ Conversations } />
        <PrivateRoute exact path='/conversation/new' component={ CreateConversation } />

        <Route component={ NoMatch } />

      </Switch>
    </div>
  </Router>
)

export default App
