import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Breadcrumb from './Breadcrumb'

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
)

export const BoardView = Template.bind({})

export const ProseView = Template.bind({})

BoardView.args = {
  boardView: true,
}

ProseView.args = {
  boardView: false,
}
