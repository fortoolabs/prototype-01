import { Grommet, Heading } from 'grommet'

interface HeadingProps {
  content: string

  level: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6 | undefined
}

export const HeadingGrommet = ({ content, level }: HeadingProps) => {
  return <Heading level={level}>{content}</Heading>
}
