import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'
import { renderObject } from 'core/renderer'
import Tag, { todoKeywordColorClasses } from 'components/doc/Tag'

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
  entry: { heading, children, text },
  depth,
}: TableOfContentsEntryProps) {
  const [transMotion, transOpened, transClosed] = [
    'transition transition-[max-height] duration-300 ease-in-out delay-100',
    'transform max-h-screen',
    'transform max-h-0',
  ]

  const { todoKeyword } = heading

  return (
    <Disclosure as="li" defaultOpen className="py-1 max-w-prose">
      {({ open }) => (
        <>
          <div className="flex items-center gap-1">
            {todoKeyword && (
              <Tag
                content={todoKeyword}
                color={todoKeywordColorClasses(todoKeyword)}
                size="small"
                shape="block"
              />
            )}
            {/* TODO: Implement when headline linking works */}
            <span className="hover:text-blue-700">
              {text.flatMap(renderObject)}
            </span>
            <Disclosure.Button
              as="span"
              className={`${!children.length && 'hidden'} contents`}
            >
              <ChevronUpIcon
                className={[
                  'transition-all',
                  open ? '' : 'rotate-180 transform',
                  'h-5 w-5 cursor-pointer hover:text-blue-700 select-none',
                ].join(' ')}
              />
            </Disclosure.Button>
          </div>
          {children && children.length > 0 && (
            <Transition
              className="overflow-none"
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
