import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse from 'core/parser'

import KanbanSpace from './index'

const text = `#+TITLE: Business Plan 📊
#+TODO: TODO | DONE

* TODO [#A] [2/4] Collect underpants :phase1:

** DONE Divide serviceable area among team

Everyone will service their own blocks and all adjacent blocks to their own. There will be gaps in the area we service but we will have enough underpants.

** DONE Draft collection routes for ever team member

Not doing this. The instructions to service one's own block and all immediately adjacent blocks are clear enough.

** TODO [0/5] Schedule collection run

- [X] Eric
- [ ] Kyle
- [ ] Kenny
- [ ] Stan
- [ ] Tweek

** TODO Complete collection run

- [ ] Eric
- [ ] kyle

* TODO [#A] ? :phase2:

Nobody knows.

* TODO [#A] Profit :phase3:

Success is guaranteed!

* Not a task

** DONE Show this top-level task in the board

This is an important one. Just to give viewers a decent top-level overview.
`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modes/Board/Organisms/KanbanSpace',
  component: KanbanSpace,
  argTypes: {
    doc: {
      control: 'text',
      description: 'Raw Org text',
    },
  },
} as ComponentMeta<typeof KanbanSpace>

// Based on ./Linear.stories.tsx
const OrgBoard = ({ doc, ...args }: { doc: string }) => (
  <KanbanSpace doc={parse(doc)} {...args} />
)

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WrappedTemplate: ComponentStory<typeof OrgBoard> = (args) => (
  <OrgBoard {...args} />
)

// const Template: ComponentStory<typeof KanbanSpace> = (args) => <KanbanSpace {...args} />

export const MockBoard = WrappedTemplate.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MockBoard.args = {
  doc: text,
}

// export const UndefinedBoard = Template.bind({})
// UndefinedBoard.args = {
//   doc: undefined,
// }

// export const EmptyBoard = Template.bind({})
// EmptyBoard.args = { doc: parse('') }

// export const OneLineBoard = Template.bind({})
// OneLineBoard.args = { doc: parse('Just a single line') }

// export const ManyStagesBoard = Template.bind({})
// ManyStagesBoard.args = {
//   doc: parse('#+TODO: BACKLOG SCOPING IMPLEMENTING TESTING | CANCELLED DONE'),
// }
