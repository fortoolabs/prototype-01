import React from 'react'
import { Menu, Transition } from '@headlessui/react'

type SessionProps = {
  name: string
  handle: string
  avatarPath: string
}

type SessionMenuOption = {
  name: string
  target: string
}

type SessionMenuProps = {
  sessionOptions: SessionMenuOption[]
}

type SessionToggleProps = {
  sessionToggle?: JSX.Element
}

export function Avatar({
  name,
  handle,
  avatarPath,
  className,
}: SessionProps & React.HTMLAttributes<HTMLImageElement>) {
  const sizeClasses = className ? className : 'h-8 w-8'

  return (
    <img
      className={`${sizeClasses} rounded-full`}
      src={avatarPath}
      alt={`Avatar for user ${name} with handle ${handle}`}
    />
  )
}

export function DesktopMenu({
  name,
  handle,
  avatarPath,
  sessionOptions,
  sessionToggle,
}: SessionProps & SessionMenuProps & SessionToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      {sessionToggle}
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <Avatar name={name} handle={handle} avatarPath={avatarPath} />
        </Menu.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sessionOptions.map((opt, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <a
                      href={opt.target}
                      className={[
                        active && 'bg-gray-100',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {opt.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

// TODO: Renable menu
export function MobileMenu({
  name,
  handle,
  avatarPath,
  sessionOptions,
  sessionToggle,
}: SessionProps & SessionMenuProps & SessionToggleProps) {
  return (
    <div className="border-t border-gray-200 pt-4 pb-3">
      <div className="max-w-8xl mx-auto flex items-center px-4 sm:px-6">
        <div className="flex-shrink-0">
          <Avatar
            className="h-10 w-10"
            name={name}
            handle={handle}
            avatarPath={avatarPath}
          />
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <div className="truncate text-base font-medium text-gray-800">
            {name}
          </div>
          <div className="truncate text-sm font-medium text-gray-500">
            {handle}
          </div>
        </div>
        {sessionToggle}
      </div>
      <div className="max-w-8xl mx-auto mt-3 space-y-1 px-2 sm:px-4">
        {sessionOptions.map((item, idx) => (
          <a
            key={idx}
            href={item.target}
            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  )
}
