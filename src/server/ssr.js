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

function renderApp(req, res, store, assets) {
    const url = req.url
    const context = {}

    let getPropsFromRoute = (routes, componentProps) => {
        let props = {};
        let lastRoute = routes[routes.length - 1];
        routes.reduceRight((prevRoute, currRoute) => {
        componentProps.forEach(componentProp => {
            if (!props[componentProp] && currRoute.component[componentProp]) {
            props[componentProp] = currRoute.component[componentProp];
            }
        });
        }, lastRoute);
        return props;
    };

    let routeProps = getPropsFromRoute(routes, ['fetchData'])
    if (routeProps.fetchData) {
        routeProps.fetchData().then(data => {

            const store = data

            // SEND RESPONSE BACK
            const html = renderToString(
                <Html
                    title='💥'
                    store={store}
                    url={url}
                    context={context}
                    assets={assets} />
                )

            res.send('<!DOCTYPE html>'+html)



        }).catch(error => console.log('Error: ', error))
    }else{
        // SEND RESPONSE BACK
        const html = renderToString(
            <Html
                title='💥'
                url={url}
                context={context}
                assets={assets} />
            )

        res.send('<!DOCTYPE html>'+html)
    }
}

export const renderPage = function (req, res) {
    // const history = createHistory()
    // const store = createStore(history)
    const store = null

    const assets = require('../../dist/assets.json')

    assets.manifest.text = fs.readFileSync(
        join(__dirname, '..', '..', 'dist', basename(assets.manifest.js)),
        'utf-8'
    )


    renderApp(req, res, store, assets)
}

export const renderDevPage = function (req, res) {

    const store = DATA
    renderApp(req, res, store)
}

export default renderPage