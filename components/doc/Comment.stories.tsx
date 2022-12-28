import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CommentsBlock from './Comment'

const exampleComments = [
  {
    text: 'Generalist-reading ',
  },
  {
    author: 'David Asabina',
    // FIXME: Remove images listing in next.config.js
    avatar:
      'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg',
    date: '30/08/2022',
    text: 'Solidity focused crypto mining installation. Python-learning destitute growth hacker.',
  },
]

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Molecules/Comment',
  component: CommentsBlock,
} as ComponentMeta<typeof CommentsBlock>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CommentsBlock> = () => (
  <div className="max-w-prose mx-auto">
    <CommentsBlock comments={exampleComments} />
  </div>
)

export const DefaultComment = Template.bind({})
