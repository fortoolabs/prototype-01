import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Comment from './Comment'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Application/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Comment> = () => <Comment />

export const DefaultComment = Template.bind({})
