import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse from 'core/parser'

import Linear from 'components/Linear'

const text = `This is just a *sample* text for testing in a Storybook.

* Linear View

The /linear view/ allows one to study a documentation as linear prose. This is probably the more common way to observe a document.

** TODO Inventorize missing capabilities/features

At this point, some untested and definitely missing features are:
- lists
- radio links
- dates
- footnotes
- tags

** TODO Determine on sensible name for this

I've struggled with Linear as the name for the view a bit as it was previously called List and I needed to already rename in anticipation of real list that would need that name. Linear is not quite a proper noun for this view when looking at how clear of a name Board is but hey... naming is hard. 🤷🏿‍♂️😅

* Background

The Storybook setup introduced =OrgLinear= which is merely a wrapper around the original =Linear= component which parses Org text and thus allows us to plug in Org raw text into the component directly and thus allowing for a better UX/DX as we can just play with Org text in the control and watch the magic happen. 🪄

This wrapping pattern is demonstrated in the [[https://storybook.js.org/docs/react/essentials/controls#fully-custom-args][Storybook docs on fully custom args]] and hopefully isn't much of an anti-pattern. 😅
`
const multipleLinkInParaText = `
*** TODO Replace uuidv4 with uuid

Use https://www.npmjs.com/package/uuid instead of https://www.npmjs.com/package/uuidv4 as per UUIDv4's notice https://github.com/thenativeweb/uuidv4#please-note.

*** TODO Adapt parsing options based on document input

The =defaultOptions= for the uniorg parser sets =todoKeywords= to =TODO= and =DONE= (see [[https://github.com/rasendubi/uniorg/blob/0970ebcb3040b10bea58aee7601b700320762420/packages/uniorg-parse/src/parse-options.ts#L31][src]]) which is in line with Org's defaults. Custom TODO keywords that are defined through the =TODO= keyword or its variants =TYP_TODO= are not being honored and thus these keywords are parsed as "just text".
`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Linear',
  component: Linear,
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
} as ComponentMeta<typeof Linear>

// Wrapper component that parses the doc prop before passing it to Linear which
// allows us to fiddle with a convenient text control where we enter raw Org
// text for fast feedback.
// https://storybook.js.org/docs/react/essentials/controls#fully-custom-args
const OrgLinear = ({ doc, ...args }: { doc: string }) => (
  <Linear doc={parse(doc)} {...args} />
)

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WrappedTemplate: ComponentStory<typeof OrgLinear> = (args) => (
  <OrgLinear {...args} />
)

const Template: ComponentStory<typeof Linear> = (args) => <Linear {...args} />

export const PlayableLinear = WrappedTemplate.bind({})
PlayableLinear.args = {
  doc: text,
}

export const EmptyLinear = Template.bind({})
EmptyLinear.args = { doc: parse('') }

export const OneLineLinear = Template.bind({})
OneLineLinear.args = { doc: parse('Just a single line') }

export const UnparsableLinear = Template.bind({})
UnparsableLinear.args = {
  doc: parse(`
<html>
  <head><title>This is not Org</title></head>

  <body>
    <p>Just trynna break things. 🤷🏿‍♂️</p>

    <p>Note how the line breaks are parsed as paragraph delimiters</p>
  </body>
</html>`),
}

export const MultipleLinksInAParagraph = WrappedTemplate.bind({})
MultipleLinksInAParagraph.args = { doc: multipleLinkInParaText }
