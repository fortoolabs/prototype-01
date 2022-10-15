import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CommentsBlock from './Comment'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Application/Comment',
  component: CommentsBlock,
} as ComponentMeta<typeof CommentsBlock>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CommentsBlock> = () => <CommentsBlock />

export const DefaultComment = Template.bind({})
