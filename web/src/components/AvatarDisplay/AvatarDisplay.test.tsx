import { render } from '@redwoodjs/testing/web'

import AvatarDisplay from './AvatarDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AvatarDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AvatarDisplay />)
    }).not.toThrow()
  })
})
