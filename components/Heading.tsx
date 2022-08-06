import { Heading as HeadingGrommet } from 'grommet'

export type HeadingProps = {
  level: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  title: string
  isTodo?: boolean
  state?: string
}

export default function Heading({ title, level }: HeadingProps) {
  return <HeadingGrommet level={level}>{title}</HeadingGrommet>
}
