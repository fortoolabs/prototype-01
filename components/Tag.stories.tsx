import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tag from './Tag'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Tag',
  component: Tag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: 'select', options:['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink'], },
    size: {control: 'select', options:['small', 'medium', 'large'],}
  },
} as ComponentMeta<typeof Tag>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const Success = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Success.args = {
  content: 'done',
  color: 'green',
}

export const Error = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  content: 'fail',
  color: 'red',
}

export const Medium = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Medium.args = {
  content: 'medium',
  size: 'medium'
}

export const Large = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  content: 'large',
  size: 'large',
}


