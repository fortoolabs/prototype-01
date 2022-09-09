import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse from 'core/parser'

import Prose from 'components/mode/Prose'

const text = `Lists *Sample*.

*** A simple List
- lists
- radio links
- dates
- footnotes
- tags

*** Descriptive List
- one :: first number
- okay :: 2nd number

*** Mixed List
- fruits

  1. apples

    - Apple Computer :: a computer company

    - Apple Records :: record label

    - Grannie Smith :: green apple

  - bananas

    Bananas are a good source of electrolyte and potassium

  - pears

  - tomatoes

- [-] vegetables
  - [X] spinach
  - [ ] broccoli
  - [[https://example.com][imaginary]]
  - [X] cabbage
  - [~] salat


`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/List',
  component: Prose,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    doc: {
      control: 'text',
      description: 'Raw Org text',
    },
    isSerif: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Prose>

// Wrapper component that parses the doc prop before passing it to Linear which
// allows us to fiddle with a convenient text control where we enter raw Org
// text for fast feedback.
// https://storybook.js.org/docs/react/essentials/controls#fully-custom-args
const OrgProse = ({ doc, ...args }: { doc: string }) => (
  <Prose doc={parse(doc)} {...args} />
)

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WrappedTemplate: ComponentStory<typeof OrgProse> = (args) => (
  <OrgProse {...args} />
)

export const DefaultLists = WrappedTemplate.bind({})
DefaultLists.args = {
  doc: text,
}
