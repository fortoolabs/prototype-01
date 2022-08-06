import { unified } from 'unified'
import parser from 'uniorg-parse'
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts#L4
import { OrgData, ObjectType, GreaterElementType, ElementType } from 'uniorg'

type FRecursiveObject = {
  content: FObjectType[]
}

type FLink = FRecursiveObject & {
  type: 'a'
  target: string
  linkType: string
}

type FBold = FRecursiveObject & {
  type: 'b'
}

type FItalic = FRecursiveObject & {
  type: 'i'
}

type FCode = {
  type: 'c'
  content: string
}

type FVerbatim = {
  type: 'v'
  content: string
}

type FStrikeThrough = FRecursiveObject & {
  type: '+'
}

type FUnderline = FRecursiveObject & {
  type: 'u'
}
type FSuperscript = FRecursiveObject & {
  type: '^'
}
type FSubscript = FRecursiveObject & {
  type: '_'
}
type FText = {
  type: 't'
  content: string
}
type FTimestamp = {
  type: 'Z'
  content: string
}
type FFootnoteReference = FRecursiveObject & {
  type: 'f'
  label: string
}
type FLatexFragment = {
  type: 'X'
  content: string
}
type FEntity = {
  type: '?'
  content: string
  html: string
}
type FTableCell = FRecursiveObject & {
  type: 'C'
}

type FObjectType =
  | FLink
  | FBold
  | FItalic
  | FCode
  | FVerbatim
  | FStrikeThrough
  | FUnderline
  | FSuperscript
  | FSubscript
  | FText
  | FTimestamp
  | FFootnoteReference
  | FLatexFragment
  | FEntity
  | FTableCell

type FHeading = FRecursiveObject & {
  type: 'h'
  level: number
  todoKeyword: string | null
  priority: string | null
  commented: boolean
  tags: string[]
}

type FParagraph = {
  type: 'p'
  content: FObjectType[]
}

type FElementType =
  | FHeading
  //  | FPlanning
  //  | FNodeProperty
  //  | FListItemTag
  //  | FCommentBlock
  //  | FSrcBlock
  //  | FExampleBlock
  //  | FExportBlock
  //  | FKeyword
  //  | FTableRow
  //  | FComment
  //  | FFixedWidth
  //  | FClock
  //  | FLatexEnvironment
  //  | FHorizontalRule
  //  | FDiarySexp
  | FParagraph

type FDocument = {
  title?: string
  source?: string
  // TODO: Define Todo type? Has annotation (e.g.: comment, shortcut) removed?
  // TODO: Breakdown into list of Todo type items
  todoStates: Array<string>
  content: Array<FElementType>
}

const emptyDocument = {
  todoStates: [],
  content: [],
}

function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch',
): never {
  throw new Error(message)
}

export function extractLabel(el: FObjectType): string {
  if ('content' in el) {
    switch (typeof el.content) {
      case 'string':
        return el.content
      default:
        return el.content
          .map(extractLabel)
          .reduce((next, acc) => acc.concat(next), '')
    }
  } else {
    assertExhaustive(el)
  }
}

function mapObjectType(x: ObjectType): FObjectType {
  // TODO: Restructure to a list of non-string members
  // A lot of information is lost in just reducing this to strings
  switch (x.type) {
    case 'link':
      // https://orgmode.org/worg/dev/org-syntax.html#Links
      return {
        type: 'a',
        target: x.rawLink,
        linkType: x.linkType,
        content: x.children.map(mapObjectType),
      }
    case 'bold':
      return { type: 'b', content: x.children.map(mapObjectType) }
    case 'italic':
      return { type: 'i', content: x.children.map(mapObjectType) }
    case 'strike-through':
      return { type: '+', content: x.children.map(mapObjectType) }
    case 'underline':
      return { type: 'u', content: x.children.map(mapObjectType) }
    case 'superscript':
      return { type: '^', content: x.children.map(mapObjectType) }
    case 'subscript':
      return { type: '_', content: x.children.map(mapObjectType) }
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
        content: x.children.map(mapObjectType),
      }
    case 'latex-fragment':
      return { type: 'X', content: x.value }
    case 'entity':
      return { type: '?', content: x.name, html: x.html }
    case 'table-cell':
      return { type: 'C', content: x.children.map(mapObjectType) }
    default:
      return assertExhaustive(x)
  }
}

function unpackElementType(
  x: GreaterElementType | ElementType,
): FElementType[] {
  switch (x.type) {
    // GreaterElementType
    case 'org-data':
      return []
    case 'section':
      return x.children.flatMap(unpackElementType)
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
      return []
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
          content: x.children.map(mapObjectType),
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
      return []
    case 'paragraph':
      return [{ type: 'p', content: x.children.map(mapObjectType) }]
    default:
      return assertExhaustive(x)
  }
}

// Convert document to internal representation
function convert(
  acc: FDocument,
  node: GreaterElementType | ElementType,
  idx: number,
): FDocument {
  switch (node.type) {
    // GreaterElementType
    case 'org-data':
      return node.children.reduce(convert, acc)
    case 'section':
      return {
        ...acc,
        content: [...acc.content, ...node.children.flatMap(unpackElementType)],
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
      return acc // noop
    // ElementType
    case 'headline':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(node)],
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
      return acc // noop
    case 'paragraph':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(node)],
      }
    default:
      return assertExhaustive(node)
  }
}

export default function parse(text: string): FDocument {
  const ast = unified().use(parser).parse(text) as OrgData
  return convert(emptyDocument, ast, 0)
}
