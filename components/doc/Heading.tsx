import { createElement, PropsWithChildren } from 'react'

import Block from 'components/doc/Block'
import Tag from 'components/doc/Tag'

export type HeadingProps = {
  level: string | number
}
function getHeadingClasses(level: string | number): [string, string] {
  const sharedClasses = '' //'font-bold'

  switch (level) {
    case '1':
    case 1:
      return [`${sharedClasses} text-xl`, 'h1']

    case '2':
    case 2:
      return [`${sharedClasses} text-xl`, 'h2']

    case '3':
    case 3:
      return [`${sharedClasses} text-lg`, 'h3']

    case '4':
    case 4:
      return [`${sharedClasses} text-lg`, 'h4']

    case '5':
    case 5:
      return [`${sharedClasses}`, 'h5']

    case '6':
    case 6:
      return [`${sharedClasses}`, 'h6']

    default:
      return [`${sharedClasses} underline heading-${level}`, 'p']
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
  tags,
}: PropsWithChildren<HeadingLineProps>) {
  const getTodoTag = (keyword: string) => {
    switch (keyword) {
      case 'TODO':
        return <Tag color="red" size="medium" content={keyword} style="block" />
      case 'DONE':
        return (
          <Tag color="green" size="medium" content={keyword} style="block" />
        )
      default:
        return (
          <Tag color="yellow" size="medium" content={keyword} style="block" />
        )
    }
  }

  const getTags = (tags: string[] | undefined) => {
    if (tags && tags.length > 0) {
      return (
        <span className="flex-auto w-32 inline-block align-baseline">
          {tags.length > 0 &&
            tags.map((tag, idx) => (
              <Tag
                key={`h${idx}-${tag}`}
                color="blue"
                size="medium"
                content={tag}
              />
            ))}
        </span>
      )
    }
  }

  const [className, elType] = getHeadingClasses(level)
  return (
    <Block className="align-bottom align-text-bottom ${classes}">
      {todoKeyword && (
        <span className="flex-auto inline-block first-of-type:mr-4">
          {getTodoTag(todoKeyword)}
        </span>
      )}
      {createElement(
        elType,
        {
          className: `flex-auto min-w-1/2 inline-block align-baseline ${className}`,
        },
        children,
      )}
      {getTags(tags)}
    </Block>
  )
}
