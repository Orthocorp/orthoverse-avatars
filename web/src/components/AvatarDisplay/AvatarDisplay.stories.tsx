// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AvatarDisplay> = (args) => {
//   return <AvatarDisplay {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import AvatarDisplay from './AvatarDisplay'

export const generated = () => {
  return <AvatarDisplay />
}

export default {
  title: 'Components/AvatarDisplay',
  component: AvatarDisplay,
} as ComponentMeta<typeof AvatarDisplay>
