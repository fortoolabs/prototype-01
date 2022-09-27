import Link from 'next/link'
import { createElement, PropsWithChildren } from 'react'

import { LinkIcon } from '@heroicons/react/20/solid'

import { FDocument } from 'core/types'
import { destinationForHeadingId } from 'core/renderer'

import Block, { blockClasses } from 'components/doc/Block'
import Tag from 'components/doc/Tag'

export type HeadingProps = {
  level: string | number
}

const sharedTypography = 'font-bold'

// Return font size and HTML element type
function getHeadingClasses(level: string | number): [string, string] {
  switch (level) {
    case '1':
    case 1:
      return ['text-2xl', 'h1']

    case '2':
    case 2:
      return ['text-xl', 'h2']

    case '3':
    case 3:
      return ['text-lg', 'h3']

    case '4':
    case 4:
      return ['text-lg', 'h4']

    case '5':
    case 5:
      return ['', 'h5']

    case '6':
    case 6:
      return ['', 'h6']

    default:
      return [`heading-${level}`, 'p']
  }
}

const headingBlockClasses = [
  'inline-block align-baseline align-text-bottom', // flex
  'mr-3 last:mr-0', // margins
  'text-ellipsis', // overflow
].join(' ')

const tagsClasses = [
  'space-x-1 space-x-reverse',
  'space-x-y space-y-reverse',
].join(' ')

const todoColor = (keyword: string) => {
  switch (keyword) {
    case 'TODO':
      return 'red'
    case 'DONE':
      return 'green'
    default:
      return 'yellow'
  }
}

const todoElement = (keyword: string | null) => {
  if (keyword === null || keyword === undefined || keyword === '') {
    return
  }

  return (
    <span className={`${headingBlockClasses} flex-none`}>
      <Tag color={todoColor(keyword)} content={keyword} shape="block" />
    </span>
  )
}

const tagsElement = (tags: string[]) => {
  if (tags && tags.length > 0) {
    return (
      <span
        className={`${headingBlockClasses} ${tagsClasses} flex flex-row-reverse flex-wrap w-2/6`}
      >
        {tags.map((tag, idx) => (
          <Tag key={`h${idx}-${tag}`} size="small" color="blue" content={tag} />
        ))}
      </span>
    )
  }
}

export type HeadingLineProps = HeadingProps & {
  id: string
  todoKeyword: string | null
  priority: string | null
  commented?: boolean
  tags: string[]
  doc?: FDocument
}
export default function HeadingLine({
  id,
  children,
  level,
  todoKeyword,
  tags: tagLabels,
  doc,
}: PropsWithChildren<HeadingLineProps>) {
  const [headingTypography, elType] = getHeadingClasses(level)

  const todo = todoElement(todoKeyword)
  const title = createElement(
    elType,
    {
      id,
      className: `inline`,
    },
    children,
  )
  const tags = tagsElement(tagLabels)

  //todo implement copying to clipboard
  const copyLink = (
    <Link href={`/#${destinationForHeadingId(id, doc)}`}>
      <a className="align-middle inline-block hover:text-c-blue-hover invisible group-hover:visible">
        <LinkIcon className="h-5 rotate-45" />
      </a>
    </Link>
  )
  const titleElement = (
    <span
      className={`${headingBlockClasses} ${sharedTypography} ${headingTypography} grow group`}
    >
      {title} {copyLink}
    </span>
  )

  return (
    <Block className={`${blockClasses} md:flex ${headingTypography}`}>
      {todo}
      {titleElement}
      {tags}
    </Block>
  )
}
