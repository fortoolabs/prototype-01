import { Fragment } from 'react'
import { FDocument, FHeading, FElementType, FObjectType } from 'core/types'

import Code, { CodeProps } from 'components/Code'
import Heading, { HeadingProps } from 'components/Heading'
import Paragraph, { ParagraphProps } from 'components/Paragraph'
import FallbackInline, { FallbackInlineProps } from 'components/FallbackInline'
import FallbackBlock, { FallbackBlockProps } from 'components/FallbackBlock'
import Date, { DateProps } from 'components/Date'

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
    case 'E':
      return [
        <pre key={i} style={{ border: '1px solid pink' }}>
          {el.content}
        </pre>,
      ]
    case 'e':
      return [
        <span key={i} style={{ border: '1px solid pink' }}>
          {el.content}
        </span>,
      ]
    default:
      assertExhaustive(el)
  }
}

export function renderObject(el: FObjectType, i: number): JSX.Element[] {
  switch (el.type) {
    case 'a':
      return [
        <a key={i} href={el.target}>
          {el.content.flatMap(renderObject)}
        </a>,
      ]
    case 'b':
      return [<b key={i}>{el.content.flatMap(renderObject)}</b>]
    case 'i':
      return [<i key={i}>{el.content.flatMap(renderObject)}</i>]
    case 'c':
      return [<code key={i}>{el.content}</code>]
    case 'v':
      return [<code key={i}>{el.content}</code>]
    case '+':
      return [<s key={i}>{el.content.flatMap(renderObject)}</s>]
    case 'u':
      return [<u key={i}>{el.content.flatMap(renderObject)}</u>]
    case '^':
      return [<sup key={i}>{el.content.flatMap(renderObject)}</sup>]
    case '_':
      return [<sub key={i}>{el.content.flatMap(renderObject)}</sub>]
    case 't':
      return [<Fragment key={i}>{el.content}</Fragment>]
    case 'Z':
      // TODO: Pass along datetime
      return [
        <time key={i} dateTime="2015-10-21">
          {el.content}
        </time>,
      ]
    case 'f':
      // TODO: Implement footnote
      return [<em key={i}>{el.content.flatMap(renderObject)}</em>]
    case 'X':
      // TODO: Display LaTeX (using MathJaX or something server-side-rendered for better perf)
      return [<code key={i}>{el.content}</code>]
    case '?':
      // TODO: Decide on and implement fallback-strategy for entity types
      return [<code key={i}>{el.content}</code>]
    case 'C':
      return [<td key={i}>{el.content.flatMap(renderObject)}</td>]
    default:
      assertExhaustive(el)
  }
}
