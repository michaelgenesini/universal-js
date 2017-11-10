import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, BrowserRouter } from 'react-router-dom'

import AppContainer from '@/universal/routes'

export default class App extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object
  }

  render () {

    const {
      history,
      store
    } = this.props

    return <BrowserRouter>
      <AppContainer { ...this.props } />
    </BrowserRouter>
  }
}