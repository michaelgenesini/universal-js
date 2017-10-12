import React, { Component } from 'react'

import Store from '@/client/Store'

export default class App extends Component {

  render() {
    return (
      <Store store={ this.props }>
        { this.props.children }
      </Store>
    )
  }

}