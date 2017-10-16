// Routes
// For Development only
import * as RouteMap from '../routes/static.js'

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js'


export const routes = [
  {
    path: '/',
    exact: true,
    component: RouteMap.Home
  },
  {
    path: '/about',
    exact: true,
    component: RouteMap.About
  },
  {
    path: '*',
    component: RouteMap.NotFound
  }
]

// EXAMPLE
//
// const routes = [
//   {
//     component: Root,
//     routes: [
//       { path: '/',
//         exact: true,
//         component: Home
//       },
//       { path: '/child/:id',
//         component: Child,
//         routes: [
//           { path: '/child/:id/grand-child',
//             component: GrandChild
//           }
//         ]
//       }
//     ]
//   }
// ]