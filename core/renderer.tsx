import { Fragment } from 'react'
import { FDocument, FHeading, FElementType, FObjectType } from 'core/types'

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

// TODO: Make this the default export
export function render(doc: FDocument): JSX.Element {
  return <span>nope</span>
}

export function renderElement(el: FElementType, i: number): JSX.Element[] {
  switch (el.type) {
    case 'h':
      switch (el.level) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          return [
            // TODO: Migrate TODOs here to Heading component source file
            // TODO: Implement heading keyword
            // TODO: Implement heading priority
            // TODO: Implement heading comment status
            // TODO: Implement heading tags
            <Heading
              key={i}
              title={el.content.flatMap(renderObject)}
              level={el.level}
            />,
          ]
        default:
          // FIXME: Implement a fallback case
          return []
      }
    case 'p':
      return [<Paragraph key={i}>{el.content.flatMap(renderObject)}</Paragraph>]
    default:
      assertExhaustive(el)
  }
}

export function renderObject(el: FObjectType, i: number): JSX.Element[] {
  switch (el.type) {
    case 'a':
      return [<a href={el.target}>{el.content.flatMap(renderObject)}</a>]
    case 'b':
      return [<b>{el.content.flatMap(renderObject)}</b>]
    case 'i':
      return [<i>{el.content.flatMap(renderObject)}</i>]
    case 'c':
      return [<code>{el.content}</code>]
    case 'v':
      return [<code>{el.content}</code>]
    case '+':
      return [<s>{el.content.flatMap(renderObject)}</s>]
    case 'u':
      return [<u>{el.content.flatMap(renderObject)}</u>]
    case '^':
      return [<sup>{el.content.flatMap(renderObject)}</sup>]
    case '_':
      return [<sub>{el.content.flatMap(renderObject)}</sub>]
    case 't':
      return [<Fragment>{el.content}</Fragment>]
    case 'Z':
      // TODO: Pass along datetime
      return [<time dateTime="2015-10-21">{el.content}</time>]
    case 'f':
      // TODO: Implement footnote
      return [<em>{el.content.flatMap(renderObject)}</em>]
    case 'X':
      // TODO: Display LaTeX (using MathJaX or something server-side-rendered for better perf)
      return [<code>{el.content}</code>]
    case '?':
      // TODO: Decide on and implement fallback-strategy for entity types
      return [<code>{el.content}</code>]
    case 'C':
      return [<td>{el.content.flatMap(renderObject)}</td>]
    default:
      assertExhaustive(el)
  }
}

// TODO: Deprecate
export default function generateComponent(el: DocumentElement, idx: number) {
  // WARN: Using index as key, which is okay for static listings
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318
  const i = idx.toString()

  // TODO: De-couple component type from storage type
  switch (el.name) {
    case 'Heading':
      // TODO: Implement fallback when level>6
      return <Heading key={i} title={el.data.title} level={el.data.level} />
    case 'Code':
      return (
        <Code key={i} language={el.data.language} source={el.data.source} />
      )
    case 'Paragraph':
      return <Paragraph key={i}>{el.data.children}</Paragraph>
    // FIXME: Fix error
    // Error: Parse failure: Unexpected token (4:30)
    // Contents of line 4: export const Row = (props) => <Box direction="row" {...props} />
    //case 'Date':
    //  return <Date key={i} timestamp={el.data.timestamp} />
    case 'FallbackInline':
      return <FallbackInline key={i} content={el.data.content} />
    case 'FallbackBlock':
      return <FallbackBlock key={i}>{el.data.children}</FallbackBlock>
    default:
      // TODO: Reinstate assertExhaustive(el) and remove empty JSX.Element return
      //return assertExhaustive(el)
      return <Fragment></Fragment>
  }
}
