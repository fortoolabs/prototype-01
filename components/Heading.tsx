import { Grommet, Heading } from 'grommet'

interface HeadingProps {
  content: string
}

export const Heading1 = ({ content }: HeadingProps) => {
  return <Heading level="1">{content}</Heading>
}
export const Heading2 = ({ content }: HeadingProps) => {
  return <Heading level="2">{content}</Heading>
}

export const Heading3 = ({ content }: HeadingProps) => {
  return <Heading level="3">{content}</Heading>
}

export const Heading4 = ({ content }: HeadingProps) => {
  return <Heading level="4">{content}</Heading>
}

export const Heading5 = ({ content }: HeadingProps) => {
  return <Heading level="5">{content}</Heading>
}

export const Heading6 = ({ content }: HeadingProps) => {
  return <Heading level="6">{content}</Heading>
}
