import {
  Children,
  PropsWithChildren,
  ReactNode,
  useState,
  HTMLAttributes,
} from 'react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'

import { blockClasses } from 'components/doc/Block'
import { Disclosure } from '@headlessui/react'

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
  /* stefano commented this out cause they are never used - their purpose was to implement Discslosure manually

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
  */

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

  const hasChildren = children?.length > 0

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
