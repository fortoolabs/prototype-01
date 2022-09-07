import { PropsWithChildren, HTMLAttributes } from 'react'

import Block from 'components/doc/Block'
import Tag from 'components/doc/Tag'

export type HeadingProps = {
  level: string | number
}
function Heading({
  children,
  className,
  level,
}: PropsWithChildren<HeadingProps> & HTMLAttributes<unknown>) {
  switch (level) {
    case '1':
    case 1:
      return <h1 className={`font-bold text-5xl ${className}`}>{children}</h1>

    case '2':
    case 2:
      return <h2 className={`font-bold text-3xl ${className}`}>{children}</h2>

    case '3':
    case 3:
      return <h3 className={`font-bold text-2xl ${className}`}>{children}</h3>

    case '4':
    case 4:
      return <h4 className={`font-bold text-xl ${className}`}>{children}</h4>

    case '5':
    case 5:
      return <h5 className={`font-bold text-lg ${className}`}>{children}</h5>

    case '6':
    case 6:
      return <h6 className={`font-bold text-2xl ${className}`}>{children}</h6>

    default:
      return (
        <p className={`font-bold underline heading-${level} ${className}`}>
          {children}
        </p>
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

  return (
    <Block className="align-bottom align-text-bottom">
      <span className="flex-auto inline-block">
        {todoKeyword && getTodoTag(todoKeyword)}
      </span>
      <Heading
        className="flex-auto min-w-1/2 inline-block align-baseline"
        level={level}
      >
        {children}
      </Heading>
      {getTags(tags)}
    </Block>
  )
}
