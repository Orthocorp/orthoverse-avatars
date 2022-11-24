import { render } from '@redwoodjs/testing/web'

import Download from './Download'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Download', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Download />)
    }).not.toThrow()
  })
})
