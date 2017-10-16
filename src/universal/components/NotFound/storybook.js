import React from 'react'
import { storiesOf } from '@storybook/react'

import NotFound from './index'

const rendering = {
    default: <NotFound/>
}

let stories = storiesOf('NotFound', module)

stories.add('Default', () => <div>{rendering.default}</div>)

export default stories