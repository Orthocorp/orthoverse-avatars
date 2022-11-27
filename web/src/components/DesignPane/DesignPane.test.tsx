import { render } from '@redwoodjs/testing/web'

import DesignPane from './DesignPane'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DesignPane', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DesignPane />)
    }).not.toThrow()
  })
})
