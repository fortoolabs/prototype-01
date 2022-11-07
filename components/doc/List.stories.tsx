import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { List } from 'components/doc/List'

import parse from 'core/parser'
import { renderElement } from 'core/renderer'

const simpleList = `
- lists
- radio links
- dates
- footnotes
- tags
`
const descriptiveList = `
- one :: first number
- okay :: 2nd number
`
const mixedList = `
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
  title: 'Document/Molecules/List',
  component: List,
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
} as ComponentMeta<typeof List>

// Wrapper component that parses the doc prop before passing it to Linear which
// allows us to fiddle with a convenient text control where we enter raw Org
// text for fast feedback.
// https://storybook.js.org/docs/react/essentials/controls#fully-custom-args
const OrgList = ({ doc }: { doc: string }) => {
  const data = parse(doc).content[0]

  if (typeof data === 'string') {
    console.error('String type data is not a list')
    return <List>String is not valid</List>
  }

  switch (data.type) {
    case 'L':
      return renderElement(data, 'random')[0]
    default:
      console.error(`Type ${data.type} is no a list`)
      return <List>wrong data type {data.type}</List>
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WrappedTemplate: ComponentStory<typeof OrgList> = (args) => (
  <OrgList {...args} />
)

export const SimpleList = WrappedTemplate.bind({})
SimpleList.args = {
  doc: simpleList,
}
export const DescriptiveList = WrappedTemplate.bind({})
descriptiveList
DescriptiveList.args = {
  doc: descriptiveList,
}
export const MixedList = WrappedTemplate.bind({})
MixedList.args = {
  doc: mixedList,
}
