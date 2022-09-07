import { Fragment } from 'react'
import { FDocument, FHeading, FElementType, FObjectType } from 'core/types'

import Code, { CodeProps } from 'components/doc/Code'
import Heading, { HeadingProps } from 'components/doc/Heading'
import Paragraph, { ParagraphProps } from 'components/doc/Paragraph'
import Link, { LinkProps } from 'components/doc/Link'
import FallbackInline, {
  FallbackInlineProps,
} from 'components/doc/FallbackInline'
import FallbackBlock, { FallbackBlockProps } from 'components/doc/FallbackBlock'
import Date, { DateProps } from 'components/doc/Date'

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
    case 'S':
      // TODO: Render section in collapsible component
      return el.content.flatMap(renderElement)
    case 'L':
      // TODO: Implement
      return []
    case 'I':
      // TODO: Implement
      return []
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
            <Heading key={i} level={el.level}>
              {el.content.flatMap(renderObject)}
            </Heading>,
          ]
        default:
          // FIXME: Implement a fallback case
          return []
      }
    case 'p':
      return [<Paragraph key={i}>{el.content.flatMap(renderObject)}</Paragraph>]
    case 'E':
      return [<FallbackBlock>{el.content}</FallbackBlock>]
    case 'e':
      return [<FallbackInline>{el.content}</FallbackInline>]
    default:
      assertExhaustive(el)
  }
}

export function renderObject(el: FObjectType, i: number): JSX.Element[] {
  switch (el.type) {
    case 'a':
      return [
        <Link
          key={i}
          url={el.target}
          linkType={el.linkType}
          label={el.content.flatMap(renderObject)}
        />,
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
