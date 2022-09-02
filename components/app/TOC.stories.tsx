import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse, { extractNestedHeadlines } from 'core/parser'

import TOC from './TOC'

const toc = [
  '* Part 1',
  '** Part 1.1 with a very long title that requires space',
  '** Part 1.2',
  '*** Part 1.2.1',
  '* Part 2',
  '* Part 3',
].join('\n')

const nonNestedToc = ['* Part 1', '* Part 2', '* Part 3'].join('\n')
export default {
  title: 'TOC',
  component: TOC,
} as ComponentMeta<typeof TOC>

const Template: ComponentStory<typeof TOC> = (args) => <TOC {...args} />

export const BareTOC = Template.bind({})
BareTOC.args = {
  headings: extractNestedHeadlines(parse(toc).content),
}
export const NonNestedTOC = Template.bind({})
NonNestedTOC.args = {
  headings: extractNestedHeadlines(parse(nonNestedToc).content),
}
