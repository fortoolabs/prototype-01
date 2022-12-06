import React from 'react'
import {
  Children,
  PropsWithChildren,
  ReactNode,
  useState,
  HTMLAttributes,
} from 'react'

import { Disclosure } from '@headlessui/react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'

import { blockClasses } from 'components/doc/Block'

export type ListWithClassNames = HTMLAttributes<'ol'> | HTMLAttributes<'ul'>
export type ListProps = ListWithClassNames
export type ListChildProps = {
  label: ReactNode
}

// TODO: Revision the API, should List take ReactNode children or a list data struct?
export function List({ children, className }: PropsWithChildren<ListProps>) {
  // FIXME: Implement ordered and definition lists
  return (
    <ul className={`${blockClasses} p-4 pl-8 list-disc ${className}`}>
      {React.Children.map(children, (x) => (
        <li>{x}</li>
      ))}
    </ul>
  )
}

export function ListChild({
  label,
  children,
}: PropsWithChildren<ListChildProps>) {
  const hasChildren = React.Children.count(children) > 0

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-start items-center rounded-lg  px-4 py-2 text-left text-sm font-medium text-black hover:bg-slate-200 ">
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-black ${!hasChildren && 'invisible'}`}
              />
              <span>{label}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="px-2  text-sm text-gray-500">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
