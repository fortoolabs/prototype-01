import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TOC from './TOC'

const TestHeadings = [
  {
    heading: 'Part 1',
    children: [
      {
        heading: 'Part 1.1 with a very long title that requires space',
      },
      {
        heading: 'Part 1.2',
        children: [
          {
            heading: 'Part 1.2.1',
          },
        ],
      },
    ],
  },
  {
    heading: 'Part 2',
  },
  {
    heading: 'Part 3',
  },
]

export default {
  title: 'TOC',
  component: TOC
} as ComponentMeta<typeof TOC>

const Template: ComponentStory<typeof TOC> = (args) => <TOC {...args} />

export const BareTOC = Template.bind({})
BareTOC.args = {
  headings: TestHeadings
}
