import React, { Component } from 'react'

function asyncRoute(getComponent) {

  return class AsyncComponent extends Component {

    state = {
      Component: null
    }

    componentDidMount() {
      if ( this.state.Component === null ) {
        getComponent().then((Component) => {
          this.setState({Component: Component})
        })
      }
    }

    render() {
      const {
        Component
      } = this.state

      if ( Component ) {
        return (<Component {...this.props} />)
      }
      return (<div>loading...</div>) // or <div /> with a loading spinner, etc..
    }
  }
}

export const Home = asyncRoute(() => {
  return System.import('@/universal/components/Home');
})

export const About = asyncRoute(() => {
  return System.import('@/universal/components/About');
})

export const NotFound = asyncRoute(() => {
  return System.import('@/universal/components/NotFound');
})