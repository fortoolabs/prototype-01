import { Grommet, Heading as HeadingGrommet } from 'grommet'

export type HeadingProps = {
  level: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  title: string
  [x: string]: any
  isTodo?: boolean
  state?: string
}

export default function Heading({ title, level, ...rest }: HeadingProps) {
  return (
    <HeadingGrommet level={level} {...rest}>
      {title}
    </HeadingGrommet>
  )
}
