import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { emptyDocument } from 'core/types'

import Linear from 'components/Linear'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Linear',
  component: Linear,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   level: { control: 'color' }
  // },
} as ComponentMeta<typeof Linear>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Linear> = (args) => <Linear {...args} />

export const UndefinedLinear = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UndefinedLinear.args = {}

export const EmptyLinear = Template.bind({})
EmptyLinear.args = {
  doc: emptyDocument,
}
