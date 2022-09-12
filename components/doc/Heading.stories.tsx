import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Heading from 'components/doc/Heading'

import parse from 'core/parser'
import { renderObject } from 'core/renderer'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Document/Heading',
  component: Heading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7] },
    title: { control: 'text', description: 'Org content of title' },
    todoKeyword: { control: 'select', options: [undefined, 'TODO', 'DONE'] },
    priority: { control: 'radio', options: [undefined, 'A', 'B', 'C'] },
    commented: { control: 'boolean' },
    tags: { control: 'object' },
  },
} as ComponentMeta<typeof Heading>

const rawTitle =
  'Hello *bold_twelve*, /italic/, +strikethrough+ and _underline_'

const OrgHeading = ({
  level,
  title,
  todoKeyword,
  priority,
  commented,
  tags,
}: {
  level: number
  title: string
  todoKeyword: string | null
  priority: string | null
  commented?: boolean
  tags: string[]
}) => {
  const getContent = (text: string) => {
    const parsed = parse(text)

    const content =
      parsed.content && parsed.content.length > 0 && parsed.content[0]

    if (content === false) {
      return '💥 Nothing to see here'
    }

    switch (content.type) {
      case 'p':
        return content.content.flatMap((el, idx) =>
          renderObject(el, `story-h-${idx}`),
        )
      default:
        return `💥 Looking at ${content.type} but refusing to dance to it! 🤷🏿‍♂️`
    }
  }

  const args = { level, todoKeyword, priority, commented, tags }

  return <Heading {...args}>{getContent(title)}</Heading>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WrappedTemplate: ComponentStory<typeof OrgHeading> = (args) => (
  <OrgHeading {...args} />
)

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />

export const PlayableHeading = WrappedTemplate.bind({})
PlayableHeading.args = {
  title: rawTitle,
  level: 1,
  tags: ['test', 'story', 'funny'],
  commented: false,
  priority: 'A',
  todoKeyword: 'TODO',
}

export const One = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
One.args = {
  level: '1',
  children: 'My Heading',
}

export const OneFull = Template.bind({})
OneFull.args = {
  level: '1',
  children: 'My Heading',
  todoKeyword: 'TODO',
  tags: ['test', 'story'],
}

export const Two = Template.bind({})
Two.args = {
  level: '2',
  children: 'My Heading',
}

export const TwoFullCommented = Template.bind({})
TwoFullCommented.args = {
  level: '2',
  children: 'My Heading',
  todoKeyword: 'TODO',
  tags: ['test', 'story'],
  commented: true,
}

export const Three = Template.bind({})
Three.args = {
  level: '3',
  children: 'My Heading',
}

export const Four = Template.bind({})
Four.args = {
  level: '4',
  children: 'My Heading',
}

export const Five = Template.bind({})
Five.args = {
  level: '5',
  children: 'My Heading',
}

export const Six = Template.bind({})
Six.args = {
  level: '6',
  children: 'My Heading',
}

export const Beyond = Template.bind({})
Beyond.args = {
  level: '7',
  children: 'My Heading',
}
