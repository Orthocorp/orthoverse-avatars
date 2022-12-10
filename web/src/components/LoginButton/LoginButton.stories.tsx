// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoginButton> = (args) => {
//   return <LoginButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LoginButton from './LoginButton'

export const generated = () => {
  return <LoginButton />
}

export default {
  title: 'Components/LoginButton',
  component: LoginButton,
} as ComponentMeta<typeof LoginButton>
