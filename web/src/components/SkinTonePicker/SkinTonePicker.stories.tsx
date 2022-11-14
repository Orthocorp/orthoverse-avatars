// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SkinTonePicker> = (args) => {
//   return <SkinTonePicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SkinTonePicker from './SkinTonePicker'

export const generated = () => {
  return <SkinTonePicker />
}

export default {
  title: 'Components/SkinTonePicker',
  component: SkinTonePicker,
} as ComponentMeta<typeof SkinTonePicker>
