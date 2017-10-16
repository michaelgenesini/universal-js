import React from 'react'
import { storiesOf } from '@storybook/react'

import About from './index'

const rendering = {
    default: <About/>
}

let stories = storiesOf('About', module)

stories.add('Default', () => <div>{rendering.default}</div>)

export default stories