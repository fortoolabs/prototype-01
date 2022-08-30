import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Layout from './LayoutMultiColumn'

export default {
  title: 'Layouts/Multi-Column',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />

export const Basic = Template.bind({})
Basic.args = {}
