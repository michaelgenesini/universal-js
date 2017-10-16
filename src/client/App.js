import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, BrowserRouter } from 'react-router-dom'

import AppContainer from '@/universal/routes'

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
    
    console.log(history, store)

    return <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  }
}