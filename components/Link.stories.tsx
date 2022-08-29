import React, { Fragment } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Link from './Link'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Link',
  component: Link,
} as ComponentMeta<typeof Link>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

// TODO: Demonstrate presentation of different PATHREG options:
// https://orgmode.org/worg/dev/org-syntax.html#Links
// - FILENAME               ("file" type)
// - PROTOCOL:PATHINNER     ("PROTOCOL" type)
// - PROTOCOL://PATHINNER   ("PROTOCOL" type)
// - id:ID                  ("id" type)
// - #CUSTOM-ID             ("custom-id" type)
// - (CODEREF)              ("coderef" type)
// - FUZZY                  ("fuzzy" type)export const SingleWordLabelWebLink = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const SingleWordLabelLink = Template.bind({})
SingleWordLabelLink.args = {
  url: 'somewhere',
  label: 'single',
}

export const LongRichTextLabelLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LongRichTextLabelLink.args = {
  url: 'somewhere',
  // FIX: Display whitespace correctly
  label: [
    <Fragment key={1}>
      This is a <b>link</b> with <i>italics</i> and <code>code</code>
    </Fragment>,
  ],
}

export const NoLabelLongLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoLabelLongLink.args = {
  url: 'https://www.example.com/very/long/path/that/will/need/to/be/truncated',
  // FIX:
  label: [],
}

export const WebLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WebLink.args = {
  url: 'https://orgmode.org',
  linkType: 'https',
  label: 'orgmode',
}

export const FileLink = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FileLink.args = {
  url: 'file:orgmanual.org',
  linkType: 'file',
  label: 'file',
}
