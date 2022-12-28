import React from 'react'
import Image from 'next/image'

import Toggle from 'components/app/Toggle'
import { LogoSecond as Logo } from 'components/app/Logo'

// Based on part of https://tailwindui.com/components/application-ui/application-shells/stacked#component-7022793f3a06d980f7d7f8394a057092
import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'

import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'

import {
  BellIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from '@heroicons/react/24/outline'

type NavigationBarProps = {
  // TODO: Consistently rename state-props to match isVAL setVAL scheme
  isDark: boolean
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setDarkMode: (x: boolean) => void
  serif: boolean
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setSerif: (x: boolean) => void
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({
  isDark,
  setDarkMode,
  serif,
  setSerif,
}: NavigationBarProps) {
  /* This example requires updating your template:

     ```
     <html class="h-full bg-gray-100">
     <body class="h-full">
     ```
  */
  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-gray-200  shadow-sm dark:bg-black dark:border-gray-700"
    >
      {({ open }) => (
        <>
          {/* large view */}
          <div className="mx-auto px-4 sm:px-6 lg:px-4">
            <div className="flex justify-between h-16">
              {/* lg left part */}
              <div className="flex">
                {/* lg logo */}
                <div className="flex-shrink-0 flex items-center">
                  <Logo
                    className={[
                      'block w-auto',
                      'h-8 md:h-[24px]', // h-8 or 24px for medium (md) screens and greater
                      'text-gray-200',
                    ].join(' ')}
                  />
                </div>
                {/* lg navigation
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name} lg
                    </a>
                  ))}
                </div>
               end lg navigation */}
              </div>
              {/* start right side of navbar*/}
              <div className="sm:ml-6 sm:flex sm:items-center">
                {/* todo: add hover menu for font settings */}
                <button className="pr-4" onClick={() => setSerif(!serif)}>
                  Aa
                </button>
                <Toggle
                  isEnabled={isDark}
                  setEnabled={setDarkMode}
                  enabledIcon={SunIcon}
                  disabledIcon={MoonIcon}
                />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
