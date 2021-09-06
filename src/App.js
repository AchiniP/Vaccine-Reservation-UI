import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Booking from './containers/Booking'
import Registration from './containers/Registration'
import UserVaccineStatus from './containers/UserVaccineStatus'


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Registration />
            </Route>
            <Route exact path='/booking'>
              <Booking />
            </Route>
            <Route exact path='/booking/update'>
              <Booking />
            </Route>
            <Route exact path='/status'>
              <UserVaccineStatus />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
