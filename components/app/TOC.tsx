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

//@vidbina let me know if Toc is going to be used somewhere else
//so I can make the styling and colors dynamic
function TableOfContentsEntry({
  entry: { heading, children, text },
  depth,
  doc,
}: TableOfContentsEntryProps) {
  const [transMotion, transOpened, transClosed] = [
    'transition transition-[max-height] duration-300 ease-in-out',
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
              isActive ? 'bg-black' : 'bg-transparent hover:bg-slate-100',
              isActive ? 'text-white' : 'text-black',
              'border-r-4',
              'border-transparent',
              // NOTE: Border can be settings-determined
              isActive ? 'hover:border-white' : 'hover:border-black',
              'transition hover:transition',
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
                    'transition-all',
                    isActive ? 'fill-white' : 'fill-black',
                    open ? '' : '-rotate-90 transform',
                    'h-4 w-4',
                    'cursor-pointer select-none',
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
              {/* TODO: @edris make full width of link clickable */}
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
                  className="cursor-pointer truncate"
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
    <ul className={['h-full overflow-y-scroll', 'text-sm'].join(' ')}>
      {headings.map((heading, idx) => (
        <TableOfContentsEntry doc={doc} key={idx} entry={heading} depth={1} />
      ))}
    </ul>
  )
}
