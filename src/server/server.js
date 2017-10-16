import http from 'http'
import express from 'express'
import colors from 'colors'
import path from 'path'

// Server Side Rendering
import {
  renderPage,
  renderDevPage
} from './ssr.js'

const PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.APP_PORT || 3000
const HOST = process.env.APP_HOST || '0.0.0.0'
process.env.isServer = true

const app = express()

if (PROD) {
  app.use('/static', express.static('dist'))
  app.get('*', renderPage)
} else {
  const HMR = require('./hmr.js')
  // Hot Module Reloading
  HMR(app)
  app.get('*', renderDevPage)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
if (!PROD) {
  app.use((err, req, res, next) => {
    console.error('error : ', err)
    res.status(err.status || 500)
  })
}

// production error handler
app.use(function(err, req, res, next) {
  console.error('error : ', err.message)
  res.status(err.status || 500);
})

const server = http.createServer(app)

server.listen(PORT, HOST, () => {
  const address = server.address()
  console.log(`${'>>>'.cyan} ${'Listening on:'.rainbow} ${'localhost:'.magenta}${`${address.port}`.green}`)
})