import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { routes } from '@/universal/routes/Routes'

export default class App extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const {
      history,
      store
    } = this.props

    return <BrowserRouter>
      { renderRoutes(routes) }
    </BrowserRouter>
  }
}