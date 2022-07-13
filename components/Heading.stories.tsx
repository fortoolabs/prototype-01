import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Heading from './Heading'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Heading',
  component: Heading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   level: { control: 'color' }
  // },
} as ComponentMeta<typeof Heading>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />

export const One = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
One.args = {
  level: '1',
  title: 'My Heading'
}

export const Two = Template.bind({})
Two.args = {
  level: '1',
  title: 'My Heading'
}

export const Three = Template.bind({})
Three.args = {
  level: '1',
  title: 'My Heading'
}
