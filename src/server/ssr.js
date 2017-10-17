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
const store = DATA

// Components
import Html from './html.js'

function renderApp(url, res, store, assets) {
    const context = {}

    const html = renderToString(
    <Html
        title='💥'
        store={store}
        url={url}
        context={context}
        assets={assets} />
    )

    res.send('<!DOCTYPE html>'+html)
}

export const renderPage = function (req, res) {
    // const history = createHistory()
    // const store = createStore(history)

    const assets = require('../../dist/assets.json')

    assets.manifest.text = fs.readFileSync(
        join(__dirname, '..', '..', 'dist', basename(assets.manifest.js)),
        'utf-8'
    )


    renderApp(req.url, res, store, assets)
}

export const renderDevPage = function (req, res) {

    const store = DATA
    renderApp(req.url, res, store)
}

export default renderPage