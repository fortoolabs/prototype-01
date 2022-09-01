import React, { useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  ArchiveBoxIcon,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import LogoIcon from 'components/app/Logo'
import {
  SessionProps,
  DesktopMenu as DesktopSessionMenu,
  MobileMenu as MobileSessionMenu,
} from 'components/app/Avatar'

type UserProps = {
  name: string
  handle: string
  avatarPath: string
}
const user: UserProps = {
  name: 'David Asabina',
  handle: 'vid@bina.me',
  avatarPath:
    'https://pbs.twimg.com/profile_images/1276458607702241282/eAH3B2eT_400x400.jpg',
}
const navigation = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' },
    ],
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] },
]
const sidebarNavigation = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  { name: 'Archive', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: NoSymbolIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilSquareIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type MobileNavProps = {
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setIsOpen: (_: boolean) => void
  isOpen: boolean
}

type MenuOption = {
  name: string
  href: string
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  icon?: React.ElementType
  current?: boolean
  children?: MenuOption[]
}

type MenuProps = {
  menuOptions: MenuOption[]
}

type PickerProps = {
  defaultOptionId: string | undefined
  options: {
    label: string
    id: string
  }[]
}

type Stylable = {
  className?: string
}

function Picker({
  className,
  defaultOptionId,
  options,
}: PickerProps & Stylable) {
  return (
    <div className={'mx-auto'.concat(className ? ` ${className}` : '')}>
      <div className="relative">
        <label htmlFor="inbox-select" className="sr-only">
          Choose inbox
        </label>
        {/* FIX: Make empty list compatible */}
        <select
          id="inbox-select"
          className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600"
          defaultValue={defaultOptionId}
        >
          {options.map((item) => (
            <option key={item.id}>{item.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

function DesktopSearchInput() {
  return (
    <div className="min-w-0 flex-1">
      <div className="relative max-w-2xl text-gray-400 focus-within:text-black">
        <label htmlFor="desktop-search" className="sr-only">
          Search
        </label>
        <input
          id="desktop-search"
          type="search"
          placeholder="Search"
          className="block w-full border-transparent pl-12 placeholder-gray-400 focus:border-transparent focus:ring-0 sm:text-sm"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function DesktopNav({
  name,
  handle,
  avatarPath,
  menuOptions,
  sessionOptions,
}: MenuProps & SessionProps) {
  return (
    <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between">
      <DesktopSearchInput />
      <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
        {menuOptions.length > 0 && (
          <nav aria-label="Global" className="flex space-x-10">
            {menuOptions.map(({ name, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="text-sm font-medium text-gray-900"
              >
                {name}
              </a>
            ))}
          </nav>
        )}
        <DesktopSessionMenu
          name={name}
          handle={handle}
          avatarPath={avatarPath}
          sessionOptions={sessionOptions}
          sessionToggle={
            <a
              href="#"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </a>
          }
        />
      </div>
    </div>
  )
}

// TODO: Move userProps into Element
function MobileNav({
  name,
  handle,
  avatarPath,
  menuOptions,
  sessionOptions,
}: MenuProps & SessionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 md:hidden">
        <MobileMenuButton onClick={() => setIsOpen(true)} />
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="#">
            <LogoIcon />
          </a>
          <button
            type="button"
            className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close main menu</span>
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="max-w-8xl mx-auto mt-2 px-4 sm:px-6">
          <MobileMenuSearchInput />
        </div>
        <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
          {menuOptions.map((item) => (
            <React.Fragment key={item.name}>
              <a
                href={item.href}
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </a>
              {item.children &&
                item.children.map((child) => (
                  <a
                    key={child.name}
                    href={child.href}
                    className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
                  >
                    {child.name}
                  </a>
                ))}
            </React.Fragment>
          ))}
        </div>
        <MobileSessionMenu
          name={name}
          handle={handle}
          avatarPath={avatarPath}
          // FIX: Remove referencing of top-scope var userNavigation
          sessionOptions={userNavigation.map(({ name, href }) => ({
            name,
            target: href,
          }))}
          //sessionToggle={
          //  <a
          //    href="#"
          //    className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
          //  >
          //    <span className="sr-only">View notifications</span>
          //    <BellIcon className="h-6 w-6" aria-hidden="true" />
          //  </a>
          //}
        />
      </MobileMenu>
    </>
  )
}

function MobileMenu({
  isOpen,
  setIsOpen,
  children,
}: MobileNavProps & { children: React.ReactNode }) {
  /* Mobile menu, show/hide this `div` based on menu open/closed state */
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-600 sm:bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40">
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
            enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
            enterTo="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
            leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
            leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
            leaveTo="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
          >
            <Dialog.Panel
              className="fixed inset-0 z-40 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-sm sm:shadow-lg"
              aria-label="Global"
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function MobileMenuButton({ onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
    </button>
  )
}

function MobileMenuSearchInput() {
  return (
    <div className="relative text-gray-400 focus-within:text-gray-500">
      <label htmlFor="mobile-search" className="sr-only">
        Search all inboxes
      </label>
      <input
        id="mobile-search"
        type="search"
        placeholder="Search all inboxes"
        className="block w-full rounded-md border-gray-300 pl-10 placeholder-gray-500 focus:border-indigo-600 focus:ring-indigo-600"
      />
      <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  )
}

function NavigationBar({
  children,
  menuOptions,
}: MenuProps & { children: React.ReactNode }) {
  // TODO: Source user
  const {
    name: userName,
    handle: userHandle,
    avatarPath: userAvatarPath,
  } = user
  // FIX: Do not reference top-scope variable userNavigation like this
  const sessionOptions = userNavigation.map(({ name, href }) => ({
    name,
    target: href,
  }))

  return (
    <header className="relative flex h-16 flex-shrink-0 items-center bg-white">
      <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
        <a
          href="#"
          className="flex h-16 w-16 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
        >
          <LogoIcon />
        </a>
      </div>
      <DesktopNav
        name={userName}
        handle={userHandle}
        avatarPath={userAvatarPath}
        menuOptions={menuOptions}
        sessionOptions={sessionOptions}
      />
      {children}
      <MobileNav
        name={userName}
        handle={userHandle}
        avatarPath={userAvatarPath}
        menuOptions={menuOptions}
        sessionOptions={sessionOptions}
      />
    </header>
  )
}

function Sidebar({ menuOptions }: MenuProps) {
  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
    >
      <div className="relative flex w-20 flex-col space-y-3 p-3">
        {menuOptions.map((item) => {
          const { icon: Icon } = item

          return (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:bg-gray-700',
                'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg',
              )}
            >
              <span className="sr-only">{item.name}</span>
              {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

function Content({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
      {/* Primary column */}
      <section
        aria-labelledby="primary-heading"
        className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
      >
        {left}
      </section>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
        <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
          {right}
        </div>
      </aside>
    </main>
  )
}

export default function Layout() {
  const defaultNavbarOption = sidebarNavigation.find((x) => x.current)

  // Note that Picker is for mobile, Sidebar is for desktop
  return (
    <div className="flex h-full flex-col">
      <NavigationBar menuOptions={navigation}>
        <Picker
          defaultOptionId={defaultNavbarOption && defaultNavbarOption.name}
          options={sidebarNavigation.map((x) => ({
            label: x.name,
            id: x.name,
          }))}
          className="md:hidden"
        />
      </NavigationBar>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar menuOptions={sidebarNavigation} />
        <Content
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
      </div>
    </div>
  )
}
