import Link from 'next/link'

import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'
import { renderObject } from 'core/renderer'
import Tag, { todoKeywordColorClasses } from 'components/doc/Tag'
import { blockClasses } from 'components/doc/Block'

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

const textClasses = 'text-sm text-gray-600 hover:text-black'

function TableOfContentsEntry({
  entry: { heading, children, text },
  depth,
}: TableOfContentsEntryProps) {
  const [transMotion, transOpened, transClosed] = [
    'transition transition-[max-height] duration-300 ease-in-out delay-100',
    'transform max-h-screen',
    'transform max-h-0',
  ]

  const { todoKeyword, id } = heading
  const depthOffset = depth ? 2 * depth : 2

  return (
    <Disclosure as="li" defaultOpen className="py-1 max-w-prose">
      {({ open }) => (
        <>
          <div className={`${blockClasses} py-1 px-1 flex items-center gap-3`}>
            <Link href={`/#${id}`} scroll={true}>
              <a>
                {todoKeyword && (
                  <Tag
                    content={todoKeyword}
                    color={todoKeywordColorClasses(todoKeyword)}
                    size="small"
                    shape="block"
                  />
                )}
                {/* TODO: Implement when headline linking works */}
                <span className="py-1 hover:text-blue-700">
                  {text.flatMap(renderObject)}
                </span>
              </a>
            </Link>
            {children.length > 0 && (
              <Disclosure.Button as="span" className="min-w-2 mr-2">
                <ChevronUpIcon
                  className={[
                    'transition-all',
                    open ? '' : 'rotate-180 transform',
                    'h-5 w-5 cursor-pointer hover:text-blue-700 select-none',
                  ].join(' ')}
                />
              </Disclosure.Button>
            )}
          </div>
          {children && children.length > 0 && (
            <Transition
              className="overflow-hidden ml-2"
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
                className={`ml-${depthOffset} h-fit`}
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
    <ul className={`${textClasses}`}>
      {headings.map((heading, idx) => (
        <TableOfContentsEntry key={idx} entry={heading} depth={1} />
      ))}
    </ul>
  )
}
