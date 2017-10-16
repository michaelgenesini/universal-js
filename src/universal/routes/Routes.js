// Routes
// For Development only
// import * as RouteMap from './static.js'

// This is used in production for code splitting via `wepback.config.server.js`
import * as RouteMap from './async.BKP.js'

// import asyncRoute from './async.js'

export const routes = isServer => [
  {
    path: '/',
    exact: true,
    component: RouteMap.Home //asyncRoute(isServer ? Promise.resolve(require('../components/Pages/Home')) : System.import('../components/Pages/Home'))
  },
  {
    path: '/about',
    exact: true,
    component: RouteMap.About //asyncRoute(isServer ? Promise.resolve(require('../components/Pages/About')) : System.import('../components/Pages/About'))
  },
  {
    path: '*',
    component: RouteMap.NotFound //asyncRoute(isServer ? Promise.resolve(require('../components/Pages/NotFound')) : System.import('../components/Pages/NotFound'))
  }
]