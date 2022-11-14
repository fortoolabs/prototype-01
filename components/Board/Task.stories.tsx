import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KanbanTask from './Task'

export default {
  title: 'Modes/Board/Molecules/Task',
  component: KanbanTask,
} as ComponentMeta<typeof KanbanTask>

const Template: ComponentStory<typeof KanbanTask> = (args) => (
  <KanbanTask {...args} />
)

export const Primary = Template.bind({})
export const Secondary = Template.bind({})
