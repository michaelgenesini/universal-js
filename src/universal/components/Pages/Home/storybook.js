import React from 'react'
import { storiesOf } from '@storybook/react'

import Home from './index'

const rendering = {
    default: <Home/>
}

let stories = storiesOf('Home', module)

stories.add('Default', () => <div>{rendering.default}</div>)

export default stories