import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Section from 'components/doc/Section'

const DummyContent = () => (
  <div>
    <h1 className="font-bold">Favorite K.Dot Songs</h1>
    <ul>
      <li>Money Trees</li>
      <li>Sing About Me, I&rsquo;m dying of thirst</li>
      <li>How much a dollar costs</li>
      <li>m.A.A.d city</li>
      <li>The blacker the berry</li>
      <li>Mortal Man</li>
      <li>King Kunta</li>
    </ul>
    <p>Compton Califonia</p>
  </div>
)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Section',
  component: Section,
} as ComponentMeta<typeof Section>

const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />

export const DefaultSection = Template.bind({})
DefaultSection.args = {
  children: <DummyContent />,
}
