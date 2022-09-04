import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'

import { renderObject } from 'core/renderer'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

type TOCHeading = {
  heading: string
  children?: Array<TOCHeading>
}

export type TOCProps = {
  headings: FNestedTableOfContents
}

// TODO: Use Disclosure to support folding
type TableOfContentsEntryProps = {
  entry: FNestedTableOfContentsEntry
  depth: number
}

function TableOfContentsEntry({
  entry: { children, text },
  depth,
}: TableOfContentsEntryProps) {
  return (
    <Disclosure as="li" defaultOpen className="py-1 w-full">
      {({ open }) => (
        <>
          <div className="flex items-center">
            <a href="#test-anchor" className="hover:text-blue-700">
              {text.flatMap(renderObject)}
            </a>
            <Disclosure.Button
              as="span"
              className={`${!children.length && 'hidden'} contents`}
            >
              <ChevronUpIcon
                className={[
                  'transition',
                  open ? '' : 'rotate-180 transform',
                  'h-5 w-5 cursor-pointer hover:text-blue-700 select-none',
                ].join(' ')}
              />
            </Disclosure.Button>
          </div>
          {children && children.length > 0 && (
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static as="ul" className={`px-${2 * depth}`}>
                {children.map((heading, idx) => (
                  <TableOfContentsEntry
                    key={idx}
                    entry={heading}
                    depth={depth + 1}
                  />
                ))}
              </Disclosure.Panel>
            </Transition>
          )}
        </>
      )}
    </Disclosure>
  )
}

export default function TOC({ headings }: TOCProps) {
  if (!headings.length) return null
  return (
    <ul className="text-sm text-gray-600">
      {headings.map((heading, idx) => (
        <TableOfContentsEntry key={idx} entry={heading} depth={1} />
      ))}
    </ul>
  )
}
