// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ClothesTonePicker> = (args) => {
//   return <ClothesTonePicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ClothesTonePicker from './ClothesTonePicker'

export const generated = () => {
  return <ClothesTonePicker />
}

export default {
  title: 'Components/ClothesTonePicker',
  component: ClothesTonePicker,
} as ComponentMeta<typeof ClothesTonePicker>
