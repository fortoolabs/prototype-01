import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  FDocument,
  FNestedTableOfContents,
  FNestedTableOfContentsEntry,
} from 'core/types'
import {
  renderObject,
  colorForWorkflowState,
  destinationForHeadingId,
} from 'core/renderer'
import Tag from 'components/doc/Tag'

import { Disclosure, Transition } from '@headlessui/react'
import CaretDown from 'components/icons/CaretDown'

type TOCHeading = {
  heading: string
  children?: Array<TOCHeading>
}

export type TOCProps = {
  headings: FNestedTableOfContents
  // TODO: Obtain document context through provider?
  doc?: FDocument
}

// TODO: Use Disclosure to support folding
type TableOfContentsEntryProps = {
  entry: FNestedTableOfContentsEntry
  depth: number
  // TODO: Obtain document context through provider?
  doc?: FDocument
}

const textClasses = 'text-sm text-black'
//@vidbina let me know if Toc is going to be used somewhere else
//so I can make the styling and colors dynamic
function TableOfContentsEntry({
  entry: { heading, children, text },
  depth,
  doc,
}: TableOfContentsEntryProps) {
  const [transMotion, transOpened, transClosed] = [
    'transition transition-[max-height] duration-300 ease-in-out delay-100',
    'transform max-h-screen',
    'transform max-h-0',
  ]
  const router = useRouter()
  const { todoKeyword } = heading
  const hasChildren = children && children.length > 0
  const notComplete = todoKeyword !== 'DONE'
  const isActive =
    router.asPath === `/#${destinationForHeadingId(heading.id, doc)}`

  return (
    <Disclosure as="li" defaultOpen={notComplete}>
      {({ open }) => (
        <>
          <div
            className={[
              'hover:bg-primary-hover',
              'border-r-4',
              'border-transparent',
              'transition',
              'hover:transition',
              'hover:border-c-blue-main',
              'py-2',
              'px-4',
              'flex',
              'items-center',
              'gap-3',
            ].join(' ')}
          >
            {hasChildren ? (
              <Disclosure.Button as="span" className="shrink-0">
                <CaretDown
                  className={[
                    'transition-all fill-slate-500',
                    open ? '' : '-rotate-90 transform',
                    'h-4 w-4 cursor-pointer hover:fill-c-blue-main select-none',
                  ].join(' ')}
                />
              </Disclosure.Button>
            ) : (
              <div className="h-4 w-4 shrink-0" />
            )}
            <Link
              href={`#${destinationForHeadingId(heading.id, doc)}`}
              scroll={true}
            >
              <a className="contents">
                {todoKeyword && (
                  <Tag
                    content={todoKeyword}
                    color={colorForWorkflowState(todoKeyword)}
                    size="small"
                    shape="circle"
                    className="shrink-0 h-3 w-3 px-0 py-0 border-0 "
                  />
                )}
                {/* TODO: Implement when headline linking works */}
                <span
                  className={`hover:text-c-blue-main cursor-pointer truncate ${
                    isActive && 'text-c-blue-main'
                  }`}
                  id={destinationForHeadingId(heading.id, doc)}
                >
                  {text.flatMap((el, i) => renderObject(el, i))}
                </span>
              </a>
            </Link>
          </div>
          {hasChildren && (
            <Transition
              className="overflow-hidden ml-5"
              show={open}
              enter={transMotion}
              enterFrom={transClosed}
              enterTo={transOpened}
              leave={transMotion}
              leaveFrom={transOpened}
              leaveTo={transClosed}
            >
              <Disclosure.Panel static as="ul" className={` h-fit`}>
                {children.map((heading, idx) => (
                  <TableOfContentsEntry
                    doc={doc}
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

export default function TOC({ headings, doc }: TOCProps) {
  if (!headings.length) return null

  return (
    <ul className={`${textClasses}`}>
      {headings.map((heading, idx) => (
        <TableOfContentsEntry doc={doc} key={idx} entry={heading} depth={1} />
      ))}
    </ul>
  )
}
