// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'

import Home from '../components/Pages/Home'

import { routes } from './Routes'

// Containers
import App from '../containers/App'

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} store={ route.store } routes={route.routes}/>
  )}/>
)

class Routes extends Component {

  render() {

    return <App>
      <Switch>
        { routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} {...this.props} />) }
      </Switch>
    </App>
  }

}

export default Routes