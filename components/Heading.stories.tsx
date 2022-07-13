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
  level: '2',
  title: 'My Heading'
}

export const Three = Template.bind({})
Three.args = {
  level: '3',
  title: 'My Heading'
}

export const Four = Template.bind({})
Four.args = {
  level: '4',
  title: 'My Heading'
}

export const Five = Template.bind({})
Five.args = {
  level: '5',
  title: 'My Heading'
}

export const Six = Template.bind({})
Six.args = {
  level: '6',
  title: 'My Heading'
}