import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PlayableProse } from 'components/mode/Prose/index.stories'
import useState from 'storybook-addon-state'

import CodeEditor from './CodeEditor'

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

export default {
  title: 'Modes/Code',
  component: CodeEditor,
  argTypes: {
    initialValue: {
      control: 'text',
      defaultValue: text,
      description: 'Raw Org text',
    },
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    height: {
      control: { type: 'number', min: 100, step: 25 },
    },
    width: {
      control: { type: 'number', min: 100, step: 25 },
    },
  },
} as ComponentMeta<typeof CodeEditor>

const Template: ComponentStory<typeof CodeEditor> = (args) => (
  <CodeEditor {...args} />
)

// FIX: This is broken, the addon state doesn't seem to respond
const SidebySideTemplate: ComponentStory<typeof CodeEditor> = ({
  initialValue,
  ...args
}) => {
  const [code, setMode] = useState('code', initialValue)
  return (
    <div className="flex gap-5">
      <CodeEditor
        initialValue={code}
        handleChange={(value) => setMode(value)}
        width={700}
        {...args}
      />
      <div className="flex-1 shrink-0">
        <PlayableProse doc={code} />
      </div>
    </div>
  )
}

export const DefaultEditor = Template.bind({})
DefaultEditor.args = {}

export const SideBySideEditor = SidebySideTemplate.bind({})
SideBySideEditor.args = {}
