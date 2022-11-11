import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Date from './Date'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Atoms/Date',
  component: Date,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    iconFill: {
      control: 'select',
      options: ['blue', 'green', 'indigo', 'purple'],
    },
    as: { control: 'select', options: ['time', 'date'] },
  },
} as ComponentMeta<typeof Date>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Date> = (args) => <Date {...args} />

export const DefaultDate = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultDate.args = {
  timestamp: 1662045464,
  as: 'date',
}
export const DefaultTime = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultTime.args = {
  timestamp: 1662143278,
  as: 'time',
}
