// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LandPane> = (args) => {
//   return <LandPane {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LandPane from './LandPane'

export const generated = () => {
  return <LandPane />
}

export default {
  title: 'Components/LandPane',
  component: LandPane,
} as ComponentMeta<typeof LandPane>
