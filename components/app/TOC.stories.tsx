import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse, { extractNestedHeadlines } from 'core/parser'

import TOC from './TOC'

const toc = [
  '* Part 1',
  "** A part with a very long title that requires space, more space than I'm willing to allocate for this, but hey 🤷🏿‍♂️... we can't have it all!",
  '** DONE Stub basic TOC component :@tijan:',
  '** DONE Fix transition (animation) bug in TOC :@tijan:',
  '** TODO Merge latest transition improvements to TOC :@vidbina:',
  '** Part 1.2',
  '*** Part 1.2.1',
  '* Part 2',
  '** TODO Compile list of notable people in CS :chore:@vidbina:',
  '** *notable folks* in /computer science/',
  '*** A',
  '**** Ada Lovelace',
  '**** Anita Borg',
  '**** Antonelli, Kathleen McNulty Mauchly',
  '*** B',
  '**** Bartik, Jean Jennings',
  '**** Bord, Anita',
  '*** C',
  '**** Carol Shaw',
  '**** Clarke, Edith',
  '*** D',
  '*** E',
  '**** Edith Clarke',
  '**** Elizabeth Feinler',
  '**** Evelyn Boyd Granville',
  '*** F',
  '**** Feinler, Elizabeth',
  '**** Frances Bilas Spence',
  '**** Frances Snyder Holder',
  '*** G',
  '**** Grace Hopper',
  '**** Granville, Evelyn Boyd',
  '*** H',
  '**** Holder, Frances Snyder',
  '**** Hopper, Grace',
  '*** I',
  '*** J',
  '**** Janese Swanson',
  '**** Jean Jennings Bartik',
  '**** Johnson, Katherine',
  '*** K',
  '**** Katherine Johnson',
  '**** Kathleen McNulty Mauchly Antonelli',
  '**** Keller, Mary (Sister) Kenneth',
  '*** L',
  '**** Lovelace, Ada',
  '*** M',
  '**** Marlyn Wescoff Meltzer',
  '**** Mary (Sister) Kenneth Keller',
  '**** Meltzer, Marlyn Wescoff',
  '*** N',
  '*** O',
  '*** P',
  '**** Parisa Tabriz',
  '**** Perlman, Radia Joy',
  '*** Q',
  '*** R',
  '**** Radia Joy Perlman',
  '**** Ruth Lichterman Teitelbaum',
  '*** S',
  '**** Shaw, Carol',
  '**** Sister Mary Kenneth Keller',
  '**** Sophie Wilson',
  '**** Spence, Frances Bilas',
  '**** Swanson, Janese',
  '*** T',
  '**** Tabriz, Parisa',
  '**** Teitelbaum, Ruth Lichterman',
  '*** U',
  '*** V',
  '*** W',
  '**** Wilson, Sophie',
  '*** X',
  '*** Y',
  '*** Z',
  '* Part 3',
].join('\n')

const nonNestedToc = ['* Part 1', '* Part 2', '* Part 3'].join('\n')

export default {
  title: 'Application/TOC',
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
