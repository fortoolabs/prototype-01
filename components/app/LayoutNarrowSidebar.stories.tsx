import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Layout from './LayoutNarrowSidebar'

export default {
  title: 'Layouts/Narrow Sidebar',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />

export const Basic = Template.bind({})
Basic.args = {}
