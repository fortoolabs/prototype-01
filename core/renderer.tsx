import Code, { CodeProps } from '../components/Code'
import Heading, { HeadingProps } from '../components/Heading'
import Paragraph, { ParagraphProps } from '../components/Paragraph'
import FallbackInline, {
  FallbackInlineProps,
} from '../components/FallbackInline'
import FallbackBlock, { FallbackBlockProps } from '../components/FallbackBlock'
import Date, { DateProps } from '../components/Date'

export type HeadingElement = {
  name: 'Heading'
  data: HeadingProps
}

export type ParagraphElement = {
  name: 'Paragraph'
  data: ParagraphProps
}

export type DateElement = {
  name: 'Date'
  data: DateProps
}

export type CodeBlockElement = {
  name: 'Code'
  data: CodeProps
}

export type FallbackInlineElement = {
  name: 'FallbackInline'
  data: FallbackInlineProps
}

export type FallbackBlockElement = {
  name: 'FallbackBlock'
  data: FallbackBlockProps
}

export type DocumentElement =
  | HeadingElement
  | ParagraphElement
  | CodeBlockElement
  | FallbackInlineElement
  | FallbackBlockElement
  | DateElement

function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch',
): never {
  throw new Error(message)
}

export default function generateComponent(el: DocumentElement, idx: number) {
  // TODO: De-couple component type from storage type
  switch (el.name) {
    case 'Heading':
      // TODO: Implement fallback when level>6
      return <Heading title={el.data.title} level={el.data.level} />
    case 'Code':
      return <Code language={el.data.language} source={el.data.source} />
    case 'Paragraph':
      return <Paragraph>{el.data.children}</Paragraph>
    case 'Date':
      return <Date timestamp={el.data.timestamp} />
    case 'FallbackInline':
      return <FallbackInline content={el.data.content} />
    case 'FallbackBlock':
      return <FallbackBlock>{el.data.children}</FallbackBlock>
    default:
      return assertExhaustive(el)
  }
}
