import { render } from '@redwoodjs/testing/web'

import ClothesTonePicker from './ClothesTonePicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClothesTonePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClothesTonePicker />)
    }).not.toThrow()
  })
})
