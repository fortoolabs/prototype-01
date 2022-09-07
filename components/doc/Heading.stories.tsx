import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Heading from 'components/doc/Heading'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Heading',
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
  children: 'My Heading',
}

export const OneFull = Template.bind({})
OneFull.args = {
  level: '1',
  children: 'My Heading',
  todoKeyword: 'TODO',
  tags: ['test', 'story'],
}

export const Two = Template.bind({})
Two.args = {
  level: '2',
  children: 'My Heading',
}

export const TwoFullCommented = Template.bind({})
TwoFullCommented.args = {
  level: '2',
  children: 'My Heading',
  todoKeyword: 'TODO',
  tags: ['test', 'story'],
  commented: true,
}

export const Three = Template.bind({})
Three.args = {
  level: '3',
  children: 'My Heading',
}

export const Four = Template.bind({})
Four.args = {
  level: '4',
  children: 'My Heading',
}

export const Five = Template.bind({})
Five.args = {
  level: '5',
  children: 'My Heading',
}

export const Six = Template.bind({})
Six.args = {
  level: '6',
  children: 'My Heading',
}
