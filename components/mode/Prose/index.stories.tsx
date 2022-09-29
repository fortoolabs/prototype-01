import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import parse from 'core/parser'

import Prose from 'components/mode/Prose'

const text = `This is just a *sample* text for testing in a Storybook.

* Prose View

The /linear view/ allows one to study a documentation as linear prose. This is probably the more common way to observe a document.

** TODO Inventorize missing capabilities/features

At this point, some untested and definitely missing features are:
- lists
- radio links
- dates
- footnotes
- tags

** TODO Determine a sensible name for this

We call this the /Prose/ view because we use this to display content in prose style. It was previously /Linear/, but it was not an optimal name for the view either as there are other views that could offer linear presentations and thus the name is not sufficiently descriptive. As an example, a roadmap view or activity view could be one such linear views that we may need to support at some point in the future. Before Linear, this view was called /List/ and I needed to already rename in anticipation of real list that would need that name. Linear is not quite a proper noun for this view when looking at how clear of a name Board is but hey... naming is hard. 🤷🏿‍♂️😅

* Background

The Storybook setup introduced =OrgLinear= which is merely a wrapper around the original =Linear= component which parses Org text and thus allows us to plug in Org raw text into the component directly and thus allowing for a better UX/DX as we can just play with Org text in the control and watch the magic happen. 🪄

This wrapping pattern is demonstrated in the [[https://storybook.js.org/docs/react/essentials/controls#fully-custom-args][Storybook docs on fully custom args]] and hopefully isn't much of an anti-pattern. 😅

* Playing with links

Here are some [[links]] that we [[id:bundle]] together to verify that displaying of multiple links that are [[https://example.com][imaginary]], [[http://www.astro.uva.nl/=dominik][on the web]] and elsewhere and work well enough. The Hyperlink page of the Org manual lists examples such as [[id:B7423F4D-2E8A-471B-8810-C40F074717E9]], [[https://orgmode.org/guide/Hyperlinks.html][Hyperlinks]], [[file:/home/dominik/images/jupiter.jpg][file links]], [[./papers/last.pdf][internal links]] and [[mailto:adent@galaxy.net][mailto links]] but we can also link to the same locations without descriptions as in [[id:B7423F4D-2E8A-471B-8810-C40F074717E9]], [[https://orgmode.org/guide/Hyperlinks.html]], [[file:/home/dominik/images/jupiter.jpg]], [[./papers/last.pdf]] and [[mailto:adent@galaxy.net]].

* Code Blocks

#+begin_src typescript
describe('source block', () => {
  // Being meta and listing code inside of code 🤯
  const dut = (x) => parse(x).content[0]

  it('parses', () => {
    const raw = \`
,#+begin_src txt
.......
. .   .
.......
,#+end_src
\`
    expect(dut(raw)).toMatchInlineSnapshot(\`
        {
          "content": ".......
        . .   .
        .......
        ",
          "type": "{",
        }
      \`)
  })
})
#+end_src
`
const multipleLinkInParaText = `
*** TODO Replace uuidv4 with uuid

Use https://www.npmjs.com/package/uuid instead of https://www.npmjs.com/package/uuidv4 as per UUIDv4's notice https://github.com/thenativeweb/uuidv4#please-note.

*** TODO Adapt parsing options based on document input

The =defaultOptions= for the uniorg parser sets =todoKeywords= to =TODO= and =DONE= (see [[https://github.com/rasendubi/uniorg/blob/0970ebcb3040b10bea58aee7601b700320762420/packages/uniorg-parse/src/parse-options.ts#L31][src]]) which is in line with Org's defaults. Custom TODO keywords that are defined through the =TODO= keyword or its variants =TYP_TODO= are not being honored and thus these keywords are parsed as "just text".

This is a trickier one than I anticipated. 😅
`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modes/Prose',
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

const Template: ComponentStory<typeof Prose> = (args) => <Prose {...args} />

export const PlayableProse = WrappedTemplate.bind({})
PlayableProse.args = {
  doc: text,
}

export const EmptyProse = Template.bind({})
EmptyProse.args = { doc: parse('') }

export const OneLineProse = Template.bind({})
OneLineProse.args = { doc: parse('Just a single line') }

export const UnparsableProse = Template.bind({})
UnparsableProse.args = {
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
