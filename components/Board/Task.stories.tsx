import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KanbanTask from './Task'

export default {
  title: 'Modes/Board/Molecules/Task',
  component: KanbanTask,
  decorators: [
    (Story) => (
      // since we are rendering just one component that doesn't need to be reordered we don't need to write a proper onDragEnd function.
      <DragDropContext
        onDragEnd={() => {
          console.log('Hello, onDragEnd!')
        }}
      >
        <Droppable droppableId="1">
          {(provided) => (
            <Story ref={provided.innerRef} {...provided.droppableProps} />
          )}
        </Droppable>
      </DragDropContext>
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
    members: [
      {
        id: 1,
        name: 'David',
        avatar:
          'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg',
      },
    ],
  },
  onEditTask: 'whatever',
}

Secondary.args = {
  index: 789,
  task: {
    id: '678',
    columnId: '222',
    name: 'Second Task',
    description: 'An other description',
    completed: false,
    daysLeft: 5,
    tags: ['storybook', 'busywork'],
    members: [
      {
        id: 2,
        name: 'Lex',
        avatar:
          'https://pbs.twimg.com/profile_images/956331551435960322/OaqR8pAB_400x400.jpg',
      },
    ],
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
