// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'

// Routes
// For Development only
import * as RouteMap from '../routes/static.js'

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js'

// Containers
import App from '@/universal/containers/App'
// import PrivateRouteContainer from 'universal/containers/PrivateRoute'

class Routes extends Component {

  render () {

    const {
      location
    } = this.props

    return (
      <App>
        <Route exact location={ location } path='/' component={ RouteMap.Home } />
        <Route exact location={ location } path='/About' component={ RouteMap.About } />
        <Route location={ location } path='*' component={ RouteMap.Home } />
      </App>
    )
  }
}

export default Routes