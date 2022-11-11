import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FSection } from 'core/types'
import parse from 'core/parser'

import Section from 'components/doc/Section'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Organism/Section',
  component: Section,
} as ComponentMeta<typeof Section>

const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />

const doc = parse(
  [
    '* DONE [C#] This is just an example :livestream:',
    'Some content inside of the section',
    '- apples',
    '  - Granny Smith',
    '  - Goldstar',
    '  - Snow White',
    '  - how do you like them?!?',
    '- oranges',
    '** TODO Render Subsection',
    'Do this without breaking the linear flow. So, left-align everything on the same y-pos.',
    '** TODO Render Another Subsection',
    'Reading is more natural when sections/paragraphs are vertically aligned. We\'ve normalized this through 1000s of years of reading texts in "grids" so why introduce diagonal reading flow now?',
    '*** DONE Stub example dummy text',
    'Just to demo the principle',
  ].join('\n'),
)

export const DefaultSection = Template.bind({})
DefaultSection.args = {
  data: doc.content[0] as FSection, // probably unsafe 🙊
  doc,
}
