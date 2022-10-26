import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Avatar } from './Menu'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})
export const Secondary = Template.bind({})

Primary.args = {
  name: 'David',
  handle: 'vidbina',
  avatarPath:
    'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg',
}

Secondary.args = {
  name: 'Lexi',
  handle: 'lfridman',
  avatarPath:
    'https://pbs.twimg.com/profile_images/956331551435960322/OaqR8pAB_400x400.jpg',
}
