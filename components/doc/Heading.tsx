import { PropsWithChildren } from 'react'

import Block from 'components/doc/Block'

export type HeadingProps = {
  level: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  isTodo?: boolean
  state?: string
}

function Heading({ children, level }: PropsWithChildren<HeadingProps>) {
  switch (level) {
    case '1':
    case 1:
      return <h1>{children}</h1>

    case '2':
    case 2:
      return <h2>{children}</h2>

    case '3':
    case 3:
      return <h3>{children}</h3>

    case '4':
    case 4:
      return <h4>{children}</h4>

    case '5':
    case 5:
      return <h5>{children}</h5>

    case '6':
    case 6:
      return <h6>{children}</h6>

    default:
      return <p className={`heading-${level}`}>{children}</p>
  }
}

export default function HeadingLine({
  children,
  level,
}: PropsWithChildren<HeadingProps>) {
  return (
    <Block>
      <Heading level={level}>{children}</Heading>
    </Block>
  )
}
