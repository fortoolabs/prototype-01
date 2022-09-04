import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Layout from './LayoutSidebar'

export default {
  title: 'Application/Layouts/Sidebar',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Layout>

export const Primary: ComponentStory<typeof Layout> = () => <Layout />
