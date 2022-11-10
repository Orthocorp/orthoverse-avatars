import { render } from '@redwoodjs/testing/web'

import SkinTonePicker from './SkinTonePicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SkinTonePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SkinTonePicker />)
    }).not.toThrow()
  })
})
