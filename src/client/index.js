import React from 'react'
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'

const customHistory = createBrowserHistory()

import { DATA } from '@/universal'
const store = DATA

const renderApp = Component => {
  hydrate(
    <AppContainer>
      <Component history={ history } store={ store } />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const nextApp = require('./App.js');
    renderApp(nextApp)
  })
}