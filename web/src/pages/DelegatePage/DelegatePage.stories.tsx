import type { ComponentMeta } from '@storybook/react'

import DelegatePage from './DelegatePage'

export const generated = () => {
  return <DelegatePage />
}

export default {
  title: 'Pages/DelegatePage',
  component: DelegatePage,
} as ComponentMeta<typeof DelegatePage>
