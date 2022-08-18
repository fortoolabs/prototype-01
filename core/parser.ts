import { unified } from 'unified'
import parser from 'uniorg-parse'
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts#L4
import { OrgData, ObjectType, GreaterElementType, ElementType } from 'uniorg'

import {
  FDocument,
  FObjectType,
  FElementType,
  FRecursiveObject,
  FHeading,
  emptyDocument,
} from 'core/types'

// TODO: Potentially clean up by letting users import types directly
export type { FDocument }

function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch',
): never {
  throw new Error(message)
}

// Extract unformatted text (which may be useful to compose ids)
export function extractText(el: FObjectType | FElementType): string {
  switch (el.type) {
    case 'Z':
      // TODO: Decide on what to return here
      return ''
    case 'c':
    case 'v':
    case 't':
    case 'X':
    case '?':
      return el.content
    case 'f':
      return el.label
    case 'E':
      return el.content
    case 'e':
      return el.content
    default:
      // TODO: Deal with empty content scenarios, e.g.: link [[https://www.example.com]]
      // This will likely warrant changing the return type to: string | undefined
      return el.content.map(extractText).join('')
  }
}

export function extractHeadlines(
  els: FElementType[],
  depth?: number,
): Array<[FHeading, string]> {
  // TODO: Avoid as-mapping since this may not be a "safe" design
  return els
    .filter((val) => {
      switch (val.type) {
        case 'h':
          if (depth) {
            return val.level <= depth
          } else return true
        default:
          return false
      }
    })
    .map((x) => {
      const heading = x as FHeading
      return [heading, extractText(heading)]
    })
}

function unpackObjectType(x: ObjectType): FObjectType {
  // TODO: Restructure to a list of non-string members
  // A lot of information is lost in just reducing this to strings
  switch (x.type) {
    case 'link':
      // https://orgmode.org/worg/dev/org-syntax.html#Links
      return {
        type: 'a',
        target: x.rawLink,
        linkType: x.linkType,
        content: x.children.map(unpackObjectType),
      }
    case 'bold':
      return { type: 'b', content: x.children.map(unpackObjectType) }
    case 'italic':
      return { type: 'i', content: x.children.map(unpackObjectType) }
    case 'strike-through':
      return { type: '+', content: x.children.map(unpackObjectType) }
    case 'underline':
      return { type: 'u', content: x.children.map(unpackObjectType) }
    case 'superscript':
      return { type: '^', content: x.children.map(unpackObjectType) }
    case 'subscript':
      return { type: '_', content: x.children.map(unpackObjectType) }
    case 'code':
      return { type: 'c', content: x.value }
    case 'verbatim':
      return { type: 'v', content: x.value }
    case 'text':
      return { type: 't', content: x.value }
    case 'timestamp':
      return { type: 'Z', content: x.rawValue }
    case 'footnote-reference':
      return {
        type: 'f',
        label: x.label,
        content: x.children.map(unpackObjectType),
      }
    case 'latex-fragment':
      return { type: 'X', content: x.value }
    case 'entity':
      return { type: '?', content: x.name, html: x.html }
    case 'table-cell':
      return { type: 'C', content: x.children.map(unpackObjectType) }
    default:
      return assertExhaustive(x)
  }
}

function unpackElementWithContext(text: string) {
  return (x: GreaterElementType | ElementType) => unpackElementType(text, x)
}

function unpackElementType(
  text: string,
  x: GreaterElementType | ElementType,
): FElementType[] {
  switch (x.type) {
    // GreaterElementType
    case 'org-data':
      return []
    case 'section':
      return x.children.flatMap(unpackElementWithContext(text))
    case 'property-drawer':
    case 'drawer':
    case 'plain-list':
    case 'list-item':
    case 'quote-block':
    case 'verse-block':
    case 'center-block':
    case 'special-block':
    case 'footnote-definition':
      // TODO: Implement instead of falling back
      return [
        { type: 'e', content: text.slice(x.contentsBegin, x.contentsEnd) },
      ]
    case 'table':
      // TODO: Implement instead of falling back
      switch (x.tableType) {
        case 'org':
          return [
            { type: 'E', content: text.slice(x.contentsBegin, x.contentsEnd) },
          ]
        case 'table.el':
          return [{ type: 'E', content: x.value }]
      }
    // ElementType
    case 'headline':
      return [
        {
          type: 'h',
          level: x.level,
          todoKeyword: x.todoKeyword,
          commented: x.commented,
          priority: x.priority,
          tags: x.tags,
          content: x.children.map(unpackObjectType),
        },
      ]
    case 'planning':
    case 'node-property':
    case 'list-item-tag':
    case 'comment-block':
    case 'src-block':
    case 'example-block':
    case 'export-block':
    case 'keyword':
    case 'table-row':
    case 'comment':
    case 'fixed-width':
    case 'clock':
    case 'latex-environment':
    case 'horizontal-rule':
    case 'diary-sexp':
      // TODO: Implement
      return []
    case 'paragraph':
      return [{ type: 'p', content: x.children.map(unpackObjectType) }]
    default:
      return assertExhaustive(x)
  }
}

function convertWithContext(text: string) {
  return (
    acc: FDocument,
    node: GreaterElementType | ElementType,
    idx: number,
  ) => convert(text, acc, node, idx)
}

// Convert document to internal representation
function convert(
  text: string,
  acc: FDocument,
  node: GreaterElementType | ElementType,
  idx: number,
): FDocument {
  // TODO: Implement fallback for all NOOPs
  switch (node.type) {
    // GreaterElementType
    case 'org-data':
      return node.children.reduce(convertWithContext(text), acc)
    case 'section':
      // TODO: Evaluate wrapping in section element
      return {
        ...acc,
        content: [
          ...acc.content,
          ...node.children.flatMap(unpackElementWithContext(text)),
        ],
      }
    case 'property-drawer':
    case 'drawer':
    case 'plain-list':
    case 'list-item':
    case 'quote-block':
    case 'verse-block':
    case 'center-block':
    case 'special-block':
    case 'footnote-definition':
    case 'table':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(text, node)],
      }

    // TODO: Note that we may not need this at a document level, since all
    // items of type Element items may be contained within a container of type
    // GreaterElement

    // ElementType
    case 'headline':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(text, node)],
      }
    case 'planning':
    case 'node-property':
    case 'list-item-tag':
    case 'comment-block':
    case 'src-block':
    case 'example-block':
    case 'export-block':
      return acc // noop
    case 'keyword':
      switch (node.key) {
        case 'TITLE':
          return { ...acc, title: node.value }
        case 'TODO':
          // FIXME: Accomodate for multiple swimlanes as per https://orgmode.org/manual/Per_002dfile-keywords.html
          return {
            ...acc,
            todoStates: node.value.split(' ').filter((x) => x != '|'),
          }
        default:
          return acc
      }
    case 'table-row':
    case 'comment':
    case 'fixed-width':
    case 'clock':
    case 'latex-environment':
    case 'horizontal-rule':
    case 'diary-sexp':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(text, node)],
      }
    case 'paragraph':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(text, node)],
      }
    default:
      return assertExhaustive(node)
  }
}

export default function parse(text: string): FDocument {
  const ast = unified().use(parser).parse(text) as OrgData
  return convert(text, emptyDocument, ast, 0)
}
