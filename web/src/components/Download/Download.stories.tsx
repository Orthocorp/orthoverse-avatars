// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Download> = (args) => {
//   return <Download {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Download from './Download'

export const generated = () => {
  return <Download />
}

export default {
  title: 'Components/Download',
  component: Download,
} as ComponentMeta<typeof Download>
