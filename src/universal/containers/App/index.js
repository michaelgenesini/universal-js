import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Navigation from '../../components/Layout/Navigation'

class App extends Component {

  // static propTypes = {
  //   children: PropTypes.element.isRequired
  // }

  render() {
    return <div>
      <Navigation />
      { this.props.children }
    </div>
  }

}

export default App