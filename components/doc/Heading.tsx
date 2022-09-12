import { createElement, PropsWithChildren } from 'react'

import Block from 'components/doc/Block'
import Tag from 'components/doc/Tag'

export type HeadingProps = {
  level: string | number
}

function getHeadingClasses(level: string | number): [string, string] {
  const sharedTypography = 'font-bold'

  switch (level) {
    case '1':
    case 1:
      return [`${sharedTypography} text-xl`, 'h1']

    case '2':
    case 2:
      return [`${sharedTypography} text-xl`, 'h2']

    case '3':
    case 3:
      return [`${sharedTypography} text-lg`, 'h3']

    case '4':
    case 4:
      return [`${sharedTypography} text-lg`, 'h4']

    case '5':
    case 5:
      return [`${sharedTypography}`, 'h5']

    case '6':
    case 6:
      return [`${sharedTypography}`, 'h6']

    default:
      return [`${sharedTypography} underline heading-${level}`, 'p']
  }
}

const headingBlockClasses = [
  'flex-auto inline-block align-baseline', // flex
  'mr-3 last:mr-0', // margins
  'overflow-hidden text-ellipsis', // overflow
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
    <span className={`${headingBlockClasses}`}>
      <Tag
        color={todoColor(keyword)}
        size="medium"
        content={keyword}
        style="block"
      />
    </span>
  )
}

const tagsElement = (tags: string[]) => {
  if (tags && tags.length > 0) {
    return (
      <span className={`${headingBlockClasses} w-32`}>
        {tags.map((tag, idx) => (
          <Tag
            key={`h${idx}-${tag}`}
            className={'mr-2'}
            color="blue"
            size="medium"
            content={tag}
          />
        ))}
      </span>
    )
  }
}

export type HeadingLineProps = HeadingProps & {
  todoKeyword: string | null
  priority: string | null
  commented?: boolean
  tags: string[]
}
export default function HeadingLine({
  children,
  level,
  todoKeyword,
  tags: tagLabels,
}: PropsWithChildren<HeadingLineProps>) {
  const [className, elType] = getHeadingClasses(level)

  const todo = todoElement(todoKeyword)
  const title = createElement(
    elType,
    {
      className: `${headingBlockClasses} min-w-1/2 ${className}`,
    },
    children,
  )
  const tags = tagsElement(tagLabels)

  return (
    <Block className="align-bottom align-text-bottom ${classes}">
      {todo} {title} {tags}
    </Block>
  )
}
