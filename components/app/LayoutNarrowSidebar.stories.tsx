import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Layout, { HorizontalDiptych } from './LayoutNarrowSidebar'
import Toggle from 'components/app/Toggle'

import {
  ArchiveBoxIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

export default {
  title: 'Application/Layouts/Narrow Sidebar',
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
    viewControl={
      <div className="flex items-center">
        <button
          className="inline-flex items-center px-2 h-6 border border-2 rounded-full shadow-sm"
          onClick={() => {}}
        >
          Aa
        </button>
        <Toggle isEnabled={false} setEnabled={() => {}} />
      </div>
    }
    sessionOptions={sessionOptions}
    navigationOptions={navigationOptions}
    menuOptions={menuOptions}
  >
    <HorizontalDiptych
      left={
        <>
          <h1 id="primary-heading" className="sr-only">
            Home
          </h1>
          {/* Your content */}
          first
          {[...Array(100).keys()].map((i) => (
            <p key={i}>here</p>
          ))}
        </>
      }
      right={
        <>
          aside
          {[...Array(100).keys()].map((i) => (
            <p key={i}>here</p>
          ))}
          {/* Your content */}
        </>
      }
    />
  </Layout>
)

export const Empty: ComponentStory<typeof Layout> = () => (
  <Layout
    {...session}
    sessionOptions={[]}
    navigationOptions={[]}
    menuOptions={[]}
  />
)
