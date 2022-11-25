import {
  Children,
  PropsWithChildren,
  ReactNode,
  useState,
  HTMLAttributes,
} from 'react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'

// import { Disclosure } from '@headlessui/react'

import { blockClasses } from 'components/doc/Block'
import { Disclosure } from '@headlessui/react';

export type ListWithClassNames = HTMLAttributes<'ol'> | HTMLAttributes<'ul'>
export type ListProps = ListWithClassNames
export type ListChildProps = {
  label: ReactNode
}

// TODO: Revision the API, should List take ReactNode children or a list data struct?
export function List({ children, className }: PropsWithChildren<ListProps>) {
  return (
      <>
        <ul className={`${blockClasses} p-4 pl-8 list-disc ${className}`}>
          {children}
        </ul>
      </>
  )
}

export function ListChild({
  label,
  children,
}: PropsWithChildren<ListChildProps>) {
  const [showChildren, setShowChildren] = useState(true)

  const animation =
    '[&>div]:overflow-hidden [&>div]:transition-[max-height] [&>div]:duration-100 [&>div]:ease-in-out'

  const itemClasses = [
    'relative h-fit',
    showChildren
      ? `[&>div]:max-h-screen ${animation}`
      : `[&>div]:max-h-0 ${animation} [&>p]:hidden [&>p:first-child]:block`,
    // children ? 'first:list-none' : 'list-disc',
  ].join(' ')

  const handleClick = () => {
    setShowChildren(!showChildren)
  }

  // TODO: @tijan let's discuss whether we use Disclosure here or not.
  // The div-transition magic is too complicated for my brain to quickly debug. 😅
  //return (
  //  <Disclosure>
  //    <Disclosure.Button className="py-2">
  //      Is team pricing available?
  //    </Disclosure.Button>
  //    <Disclosure.Panel className="text-gray-500">
  //      Yes! You can purchase a license that you can share with your entire
  //      team.
  //    </Disclosure.Panel>
  //  </Disclosure>
  //)

  return (
    <>

      <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{label}</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

      {/* <li className={itemClasses}>
        {label}
        {Children.count(children) > 0 && (
          <div className="">
            {children}
            {false && (
              <ChevronUpIcon
                className={[
                  'absolute',
                  'top-0',
                  'h-5',
                  'w-5',
                  'cursor-pointer',
                  'select-none',
                  'transition',
                  showChildren ? '' : 'rotate-180 transition duration-100',
                ].join(' ')}
                onClick={handleClick}
              />
            )}
          </div>
        )}
      </li> */}
    </>


  )
}
