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

export const Primary: ComponentStory<typeof Layout> = () => <Layout />
