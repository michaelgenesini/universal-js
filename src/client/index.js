import React from 'react'
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'

const customHistory = createBrowserHistory()

import { DATA } from '@/universal'
const store = DATA

let ComponentWithStore = (Component, props) => {
  let initialState = window.__INITIAL_STATE__
  if (initialState !== undefined) {
    // let store = JSON.parse(initialState)
    let store = initialState
    return <Component {...props} store={ store } />
  } else {
    return <Component {...props} />
  }
}

{/* <Component history={ history } store={ store } /> */}

const renderApp = Component => {
  hydrate(
    <AppContainer>
      { ComponentWithStore(Component, { history: history }) }
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const nextApp = require('./App.js')
    renderApp(nextApp)
  })
}