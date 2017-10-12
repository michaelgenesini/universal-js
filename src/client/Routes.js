import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/about" component={ About } />
    <Route component={ NotFoundPage } />
  </Switch>
)

export default Routes
