import { render } from '@redwoodjs/testing/web'

import DelegatePage from './DelegatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DelegatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DelegatePage />)
    }).not.toThrow()
  })
})
