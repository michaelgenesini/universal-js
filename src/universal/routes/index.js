// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'

import { routes } from './Routes'

// Containers
import App from '../containers/App'
// import PrivateRouteContainer from 'universal/containers/PrivateRoute'

class Routes extends Component {

  render () {

    const {
      location
    } = this.props

    return (
      <Switch>
        <App>
          { renderRoutes(routes) }
        </App>
      </Switch>
    )
  }
}

export default Routes