import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tag from './Tag'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Atoms/Tag',
  component: Tag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      control: 'select',
      options: [
        'blue',
        'gray',
        'red',
        'green',
        'yellow',
        'indigo',
        'purple',
        'pink',
      ],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    shape: { control: 'select', options: ['block', 'pill'] },
  },
} as ComponentMeta<typeof Tag>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const DefaultTag = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultTag.args = {
  content: 'default',
}

export const SuccessTag = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SuccessTag.args = {
  content: 'done',
  color: 'green',
}

export const ErrorTag = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ErrorTag.args = {
  content: 'fail',
  color: 'red',
}

export const SmallTag = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SmallTag.args = {
  content: 'small',
  size: 'small',
}

export const MediumTag = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MediumTag.args = {
  content: 'medium',
  size: 'medium',
}

export const LargeTag = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LargeTag.args = {
  content: 'large',
  size: 'large',
}
