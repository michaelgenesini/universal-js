import { join } from 'path'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'

// Configuration
const options = require('../../config/config')
const {
	dist
} = options

import AppContainer from '../universal/routes'

export default class Html extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        assets: PropTypes.object
    }

    render () {

        const PROD = process.env.NODE_ENV === 'production'

        const {
            title,
            assets,
            store,
            url,
            context,
        } = this.props

        const {
            manifest,
            app,
            vendor
        } = assets || {}

        const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store)}`

        // DO NOT REMOVE COMMENT: this make every call
        // const Layout = PROD ? require( join(dist, 'prerender.js') ) : () => <AppContainer store={ store } />
        const Layout = () => <AppContainer store={ store } />

        const root = renderToString(<StaticRouter location={url} context={context}>
            <Layout />
        </StaticRouter>)

        const React16IE = `
        <!-- Required for React 16+ -->
        <!--[if IE]>
        <script>
        if(!('requestAnimationFrame' in window))requestAnimationFrame=function(cb){setTimeout(cb)}
        </script>
        <![endif]-->
        `

        return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <title>{title}</title>
                    { PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css" /> }
                </head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: initialState }} />

                    <div id="root" dangerouslySetInnerHTML={{ __html: root }}></div>

                    { PROD && <script dangerouslySetInnerHTML={{ __html: manifest ? manifest.text : null }}/> }
                    <script src={ PROD ? vendor.js : '/static/vendor.js' }/>
                    <script src={ PROD ? app.js : '/static/app.js' } />
                    { PROD && <div dangerouslySetInnerHTML={{ __html: React16IE }}/> }
                </body>
            </html>
        )
    }

}