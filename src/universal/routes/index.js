// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'

import { routes } from './Routes'

// Containers
import App from '../containers/App'

class Routes extends Component {

  render () {

    const {
      location,
      isServer
    } = this.props

    console.log('ROUTES: ', isServer)

    return (
      <App>
        <Switch>
          { renderRoutes(routes(isServer)) }
        </Switch>
      </App>
    )
  }
}

export default Routes