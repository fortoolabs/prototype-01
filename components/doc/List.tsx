import {
  Children,
  PropsWithChildren,
  ReactNode,
  useState,
  HTMLAttributes,
} from 'react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'

import { Disclosure } from '@headlessui/react'

import { blockClasses } from 'components/doc/Block'

export type ListWithClassNames = HTMLAttributes<'ol'> | HTMLAttributes<'ul'>
export type ListProps = ListWithClassNames
export type ListChildProps = {
  label: ReactNode
}

// TODO: Revision the API, should List take ReactNode children or a list data struct?
export function List({ children, className }: PropsWithChildren<ListProps>) {
  return (
    <Disclosure>
      <Disclosure.Button
        as="ul"
        className={`${blockClasses} p-4 pl-8 list-disc ${className}`}
      >
        {/* <ul className={`${blockClasses} p-4 pl-8 list-disc ${className}`}> */}
        {children}
        {/* </ul> */}
      </Disclosure.Button>
    </Disclosure>
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
    // <Disclosure.Panel as="li" className={itemClasses}>
    <li className={itemClasses}>
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
    </li>
    // </Disclosure.Panel>
  )
}
