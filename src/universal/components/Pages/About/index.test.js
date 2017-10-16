import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import About from './'

// it('renders correctly', () => {
//     const wrapper = mount(
//         <About id="aboutid" />
//     )
//     const input = wrapper.find('#aboutid')
//     expect(input.length).toBe(1)
// });

it('renders correctly snapshot', () => {
  const tree = renderer.create(
     <About id="aboutid" />
  ).toJSON()
  expect(tree)
})
