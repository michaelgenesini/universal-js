import React, { Component } from 'react'

function asyncRoute(getComponent) {

  return class AsyncComponent extends Component {

    state = {
      Component: null
    }

    componentDidMount() {
      if (this.state.Component === null) {
        getComponent().then(Component => {
          this.setState({ Component: Component })
        })
      }
    }

    render() {
      const {
        Component
      } = this.state

      if (Component) {
        return <Component {...this.props} />
      }
      return <div>loading...</div>
    }
  }
}

export const Home = asyncRoute(() => System.import('../components/Pages/Home'))

export const About = asyncRoute(() => System.import('../components/Pages/About'))

export const NotFound = asyncRoute(() => System.import('../components/Pages/NotFound'))