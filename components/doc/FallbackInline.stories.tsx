import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FallbackInline from './FallbackInline'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/FallbackInline',
  component: FallbackInline,
} as ComponentMeta<typeof FallbackInline>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FallbackInline> = (args) => (
  <FallbackInline {...args} />
)

export const LinkFallback = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LinkFallback.args = {
  children: '[[https://example.com][link]]',
  border: false,
}
export const DateFallback = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DateFallback.args = {
  children: '[2022-08-24 Wed 16:43]',
  border: true,
}
