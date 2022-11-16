import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KanbanTask from './Task'

export default {
  title: 'Modes/Board/Molecules/Task',
  component: KanbanTask,
  decorators: [
    (Story) => (
      <Droppable>
        <Story />
      </Droppable>
    ),
  ],
} as ComponentMeta<typeof KanbanTask>

const Template: ComponentStory<typeof KanbanTask> = (args) => (
  <KanbanTask {...args} />
)

export const Primary = Template.bind({})
export const Secondary = Template.bind({})
export const Completed = Template.bind({})

Primary.args = {
  index: 123,
  task: {
    id: '456',
    attachment: 'file-path',
    columnId: '678',
    name: 'This Task',
    description: 'Accurate but concise description',
    completed: false,
    daysLeft: 5,
    tags: ['storybook', 'busywork'],
    members: [{ id: 456, name: 'David', avatar: 'this url' }],
  },
  onEditTask: 'whatever',
}

Primary.args = {
  index: 789,
  task: {
    id: '678',
    columnId: '222',
    name: 'Second Task',
    description: 'An other description',
    completed: false,
    daysLeft: 5,
    tags: ['storybook', 'busywork'],
    members: [{ id: 668, name: 'Stefano', avatar: 'this url' }],
  },
  onEditTask: 'whatever',
}

Completed.args = {
  index: 123,
  task: {
    id: '456',
    columnId: '678',
    name: 'This Task',
    description: 'Accurate but concise description',
    completed: true,
    daysLeft: 5,
    tags: ['storybook', 'busywork'],
    members: [{ id: 456, name: 'David', avatar: 'this url' }],
  },
  onEditTask: 'whatever',
}
