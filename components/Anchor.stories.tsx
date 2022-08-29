import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Anchor from './Anchor'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Link',
  component: Anchor,
} as ComponentMeta<typeof Anchor>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Anchor> = (args) => (
  <Anchor {...args} />
)

export const SingleWordLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SingleWordLink.args = {
  url: 'https://www.google.com/',
  label: 'google',
}

export const MultipleWordsLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MultipleWordsLink.args = {
  url: 'https://www.google.com/',
  label: 'This is a link to google',
}
export const ExternalLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ExternalLink.args = {
  url: 'https://www.google.com/',
  label: 'This is an external Link',
  externalLink: true,
}

