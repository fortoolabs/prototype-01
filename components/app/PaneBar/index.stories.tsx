import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaneBar from './index'

export default {
  title: 'PaneBar',
  component: PaneBar,
} as ComponentMeta<typeof PaneBar>

const Template: ComponentStory<typeof PaneBar> = (args) => <PaneBar {...args} />

export const Loading = Template.bind({})

export const Failing = Template.bind({})

Loading.args = {
  isLoading: true,
  isFailing: false,
  boardView: true,
  setBoardView: 'hallo!',
}

Failing.args = {
  isLoading: false,
  isFailing: true,
  boardView: true,
  setBoardView: 'hallo!',
}
