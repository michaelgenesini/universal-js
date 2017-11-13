// Node Modules
import fs from 'fs'
import { basename, join } from 'path'

// Libraries
import React from 'react'
import { renderToString } from 'react-dom/server'

// Redux
// // import {push} from 'react-router-redux';
// import createStore from 'universal/redux/createStore.js'
// import createHistory from 'history/createMemoryHistory'

import { DATA } from '../universal'

import { routes } from '../universal/routes/Routes'

// Components
import Html from './html.js'

async function getStore(url) {
    let lastRoute = routes[routes.length - 1]
    let componentProps = ['fetchData']
    // Get the route I need
    let route = routes.reduce((props, route) => route.path === url ? { component: route.component } : props , { component: lastRoute.component })
    // Check if this route has one of the componentProps methods
    componentProps.forEach(componentProp => {
        if (route.component[componentProp]) {
            route[componentProp] = route.component[componentProp]
        }
    })
    // Manage every single componentProps method
    if (route.fetchData) {
        // Call the static method to get that component data and pass down as store
        return route.fetchData()
    }else{
        return Promise.resolve(null)
    }
}

function renderApp(req, res, assets) {
    const url = req.url
    const context = {}
    getStore(url)
        .then(store => {
            // SEND RESPONSE BACK
            const html = renderToString(
                <Html
                    title='💥'
                    url={url}
                    store={store}
                    context={context}
                    assets={assets} />
                )
            res.send('<!DOCTYPE html>'+html)
        })
        .catch(error => { console.log(error); res.status(500).send(error) })

}

export const renderPage = function (req, res) {
    // const history = createHistory()
    // const store = createStore(history)

    const assets = require('../../dist/assets.json')

    assets.manifest.text = fs.readFileSync(
        join(__dirname, '..', '..', 'dist', basename(assets.manifest.js)),
        'utf-8'
    )

    renderApp(req, res, assets)
}

export const renderDevPage = function (req, res) {

    renderApp(req, res)
}

export default renderPage