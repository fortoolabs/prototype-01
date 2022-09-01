import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Layout from './LayoutNarrowSidebar'

import {
  ArchiveBoxIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

export default {
  title: 'Layouts/Narrow Sidebar',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Layout>

const session = {
  name: 'David Asabina',
  handle: 'vid@bina.me',
  avatarPath:
    'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg',
}
const sessionOptions = [
  { name: 'Your Profile', target: '#' },
  { name: 'Sign out', target: '#' },
]

const menuOptions = [
  { name: 'Open', target: '#', icon: InboxIcon, current: true },
  { name: 'Archive', target: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Customers', target: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', target: '#', icon: FlagIcon, current: false },
  { name: 'Spam', target: '#', icon: NoSymbolIcon, current: false },
  { name: 'Drafts', target: '#', icon: PencilSquareIcon, current: false },
]

const navigationOptions = [
  {
    name: 'Inboxes',
    target: '#',
    children: [
      { name: 'Technical Support', target: '#' },
      { name: 'Sales', target: '#' },
      { name: 'General', target: '#' },
    ],
  },
  { name: 'Reporting', target: '#', children: [] },
  { name: 'Settings', target: '#', children: [] },
]

export const Primary: ComponentStory<typeof Layout> = () => (
  <Layout
    {...session}
    sessionOptions={sessionOptions}
    navigationOptions={navigationOptions}
    menuOptions={menuOptions}
  />
)

export const Empty: ComponentStory<typeof Layout> = () => (
  <Layout
    {...session}
    sessionOptions={[]}
    navigationOptions={[]}
    menuOptions={[]}
  />
)
