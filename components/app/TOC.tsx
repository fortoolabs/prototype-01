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
  // FIX: [#C] @tijan fit height of Disclosure to content
  // Figure out why the height of the Disclosure container does not adjust
  // itself to the height of its contents. The current fold/expand behavior has
  // a hard cut as the container remains fixed in height while the content is
  // transformed by scaling along the y-axis.
  const [transMotion, transOpened, transClosed] = [
    [
      'transition duration-300 ease-in-out',
      'transform transform-[height] h-fit origin-top',
    ].join(' '),
    'transform scale-y-100',
    'transform scale-y-0',
  ]
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
              show={open}
              enter={transMotion}
              enterFrom={transClosed}
              enterTo={transOpened}
              leave={transMotion}
              leaveFrom={transOpened}
              leaveTo={transClosed}
            >
              <Disclosure.Panel
                static
                as="ul"
                className={`px-${2 * depth} h-fit`}
              >
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
