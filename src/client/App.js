import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'

// Components
import Routes from '@/universal/routes/Routes.js'

export default class App extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    const {
      history
    } = this.props;

    return <Route render={
      ({ location }) => <Routes location={location} />
    }/>
  }
}