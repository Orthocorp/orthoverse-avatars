// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DesignPane> = (args) => {
//   return <DesignPane {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import DesignPane from './DesignPane'

export const generated = () => {
  return <DesignPane />
}

export default {
  title: 'Components/DesignPane',
  component: DesignPane,
} as ComponentMeta<typeof DesignPane>
