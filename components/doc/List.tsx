import React from 'react'
import { PropsWithChildren, ReactNode, Fragment, HTMLAttributes } from 'react'

import { FListItem } from 'core/types'

import { Disclosure } from '@headlessui/react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'

import { blockClasses } from 'components/doc/Block'

export type ListWithClassNames = HTMLAttributes<'ol'> | HTMLAttributes<'ul'>
export type ListProps = ListWithClassNames
export type ListChildProps = {
  checkbox: FListItem['checkbox']
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
          <Disclosure.Button className="flex w-full justify-start items-center rounded-lg py-2 text-left  text-gray-600 transition hover:transition hover:text-black font-medium group">
            <span>{label}</span>

            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform transition' : ''
              } ml-5 h-5 w-5 text-black shrink-0 transition group-hover:-translate-y-px group-hover:transition`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-2">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
