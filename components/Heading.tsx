import { Grommet, Heading } from 'grommet'

interface HeadingProps {
  content: string
  props: { level: string }
}

export const HeadingGrommet = ({ content, props }: HeadingProps) => {
  return <Heading level={props.level}>{content}</Heading>
}
