import { unified } from 'unified'
import parser from 'uniorg-parse'
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts#L4
import {
  OrgData,
  OrgNode,
  ObjectType,
  Keyword,
  Paragraph,
  Section,
  GreaterElementType,
  ElementType,
  //Text,
  //Link,
} from 'uniorg'

type FRecursiveObject = {
  content: FObjectType[]
}

type FLink = FRecursiveObject & {
  type: 'a'
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

const uniorgFilter = (data: OrgNode): boolean => true

function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch',
): never {
  throw new Error(message)
}

function reduceKeyword(acc: FDocument, x: Keyword): FDocument {
  switch (x.key) {
    case 'TITLE':
      return { ...acc, title: x.value }
    case 'TODO':
      return { ...acc, todoStates: x.value.split(' ').filter((x) => x != '|') }
    default:
      return acc
  }
}

function mapObjectType(x: ObjectType): FObjectType {
  // TODO: Restructure to a list of non-string members
  // A lot of information is lost in just reducing this to strings
  switch (x.type) {
    case 'link':
      return { type: 'a', content: x.children.map(mapObjectType) }
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

function mapParagraph(x: Paragraph): FParagraph {
  return { type: 'p', content: x.children.map(mapObjectType) }
}

function reduceParagraph(acc: FDocument, x: Paragraph): FDocument {
  return {
    ...acc,
    content: [...acc.content, mapParagraph(x)],
  }
}

function reduceSection(acc: FDocument, x: Section): FDocument {
  // TODO: Implement, just skipping for now
  return acc
}

function reduceTopLevel(
  acc: FDocument,
  node: GreaterElementType | ElementType,
  idx: number,
): FDocument {
  // Handle top-level top-level
  switch (node.type) {
    // GreaterElement
    case 'org-data':
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
    // Element
    case 'headline':
    case 'planning':
    case 'node-property':
    case 'list-item-tag':
    case 'comment-block':
    case 'src-block':
    case 'example-block':
    case 'export-block':
    case 'table-row':
    case 'comment':
    case 'fixed-width':
    case 'clock':
    case 'latex-environment':
    case 'horizontal-rule':
    case 'diary-sexp':
      return acc // do nothing
    case 'keyword':
      return reduceKeyword(acc, node)
    case 'paragraph':
      return reduceParagraph(acc, node)
    case 'section':
      return reduceSection(acc, node)
    default:
      return assertExhaustive(node)
  }
}

export default function parse(text: string): FDocument {
  const ast = unified().use(parser).parse(text) as OrgData
  const empty = {
    todoStates: [],
    content: [],
  }
  console.log('AST', ast.children)
  return ast.children.reduce(reduceTopLevel, empty)
}
