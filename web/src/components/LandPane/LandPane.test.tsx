import { render } from '@redwoodjs/testing/web'

import LandPane from './LandPane'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LandPane', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LandPane />)
    }).not.toThrow()
  })
})
