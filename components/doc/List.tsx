import React from 'react'
import {
  Children,
  PropsWithChildren,
  ReactNode,
  Fragment,
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
  if (React.Children.count(children) == 0) {
    return <span>{label}</span>
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-start items-center rounded-lg  px-4 py-2 text-left text-sm font-medium text-black hover:bg-slate-200 ">
            <span>{label}</span>

            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } ml-5 h-5 w-5 text-black`}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            as={Fragment}
            className="px-2  text-sm text-gray-500"
          >
            {/* FIXME: Pass single child into ListChild instead of collection */}
            {children[0]}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
