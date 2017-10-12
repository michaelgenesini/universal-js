import React, { Component } from 'react'

export default class Store extends Component {

  render() {
    return (
      <div {...window.__APP_INITIAL_STATE__} >
        { this.props.children }
      </div>
    )
  }

}