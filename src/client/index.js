import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'


import createBrowserHistory from 'history/createBrowserHistory'
import Routes from './routes'

const customHistory = createBrowserHistory()

// Redux
// import { Provider } from 'react-redux';
// import createStore from '../universal/redux/createStore.js';
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();
// const store = createStore(history);
import { DATA } from '@/universal'
const store = {}

const renderApp = () => {
    render(
      <App />,
      document.getElementById('root')
    )
}

renderApp()

// renderApp(App)

// if (module.hot) {
//   module.hot.accept('./containers/AppContainer.js', () => {
//     const nextApp = require('./containers/AppContainer.js');
//     renderApp(nextApp);
//   });
// }