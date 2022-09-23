import Link from 'next/link'

import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'
import { renderObject } from 'core/renderer'
import Tag, { todoKeywordColorClasses } from 'components/doc/Tag'

import { Disclosure, Transition } from '@headlessui/react'
import CaretDown from 'components/icons/CaretDown'

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

const textClasses = 'text-sm text-white'
//@vidbina let me know if Toc is going to be used somewhere else
//so I can make the styling and colors dynamic
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
  const hasChildren = children && children.length > 0

  return (
    <Disclosure as="li" defaultOpen className="max-w-prose">
      {({ open }) => (
        <>
          <div className="hover:bg-primary-hover hover:border-r-4 hover:border-c-blue-main py-2 px-4 flex items-center gap-3">
            {hasChildren ? (
              <Disclosure.Button as="span" className="shrink-0">
                <CaretDown
                  className={[
                    'transition-all fill-white',
                    open ? '' : '-rotate-90 transform',
                    'h-4 w-4 cursor-pointer hover:fill-blue-300 select-none',
                  ].join(' ')}
                />
              </Disclosure.Button>
            ) : (
              <div className="h-4 w-4 shrink-0" />
            )}
            <Link href={`/#${id}`} scroll={true}>
              <a>
            {todoKeyword && (
              <Tag
                content={todoKeyword}
                color={todoKeywordColorClasses(todoKeyword)}
                size="small"
                shape="circle"
                className="shrink-0 h-3 w-3 px-0 py-0 border-0 "
              />
            )}
            {/* TODO: Implement when headline linking works */}
            <span className="hover:text-blue-300 cursor-pointer">
              {text.flatMap(renderObject)}
            </span>
              </a>
            </Link>
          </div>
          {hasChildren && (
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
