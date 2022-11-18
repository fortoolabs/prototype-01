import { ComponentMeta } from '@storybook/react'

import Breadcrumbs from './Breadcrumbs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modes/Prose/Molecules/Breadcrumbs',
  component: Breadcrumbs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Breadcrumbs>

export const Empty = () => <Breadcrumbs pages={[]} />

export const Single = () => (
  <Breadcrumbs pages={[{ name: 'Projects', target: '#', current: false }]} />
)

export const Double = () => (
  <Breadcrumbs
    pages={[
      { name: 'One', target: '#', current: false },
      { name: 'Two', target: '#', current: false },
    ]}
  />
)

export const Long = () => (
  <Breadcrumbs
    pages={[
      { name: 'Projects', target: '#', current: false },
      {
        name: 'Project Nero With a Very Long Title that is much longer than we are ready to handle',
        target: '#',
        current: true,
      },
      {
        name: 'Project Nero With a Very Long Title that is much longer than we are ready to handle',
        target: '#',
        current: true,
      },
    ]}
  />
)
