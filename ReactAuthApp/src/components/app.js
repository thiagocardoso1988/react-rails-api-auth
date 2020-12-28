import Axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard';
import Home from './home';
import axios from 'axios'

export const NOT_LOGGED_IN = 'NOT_LOGGED_IN'
export const LOGGED_IN = 'LOGGED_IN'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: NOT_LOGGED_IN,
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === NOT_LOGGED_IN) {
          this.setState({
            loggedInStatus: LOGGED_IN,
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === LOGGED_IN) {
          this.setState({
            loggedInStatus: NOT_LOGGED_IN,
            user: {}
          })
        }
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: LOGGED_IN,
      user: data
    })
  }

  handleLogout () {
    this.setState({
      loggedInStatus: NOT_LOGGED_IN,
      user: {}
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
