import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { emptyDocument } from 'core/types'

import Board from 'components/Board'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Board',
  component: Board,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   level: { control: 'color' }
  // },
} as ComponentMeta<typeof Board>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Board> = (args) => <Board {...args} />

export const UndefinedBoard = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UndefinedBoard.args = {}

export const EmptyBoard = Template.bind({})
EmptyBoard.args = {
  doc: emptyDocument,
}
