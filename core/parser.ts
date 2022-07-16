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
  //Text,
  //Link,
} from 'uniorg'

// Link , Bold , Italic , Code , Verbatim , StrikeThrough , Underline , Superscript , Subscript , Text , Timestamp , FootnoteReference , LatexFragment , Entity, TableCell;

type FParagraph = {
  type: 'Paragraph'
  content: string
}

type FHeading = {
  type: 'Heading'
  content: string
}

type FElement = FParagraph | FHeading

type FDocument = {
  title?: string
  source?: string
  // TODO: Define Todo type? Has annotation (e.g.: comment, shortcut) removed?
  // TODO: Breakdown into list of Todo type items
  todoStates: Array<string>
  content: Array<FElement>
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

function mapParagraphContent(x: ObjectType): string {
  // TODO: Restructure to a list of non-string members
  // A lot of information is lost in just reducing this to strings
  switch (x.type) {
    case 'link':
      return x.rawLink
    case 'bold':
    case 'italic':
    case 'strike-through':
    case 'underline':
    case 'superscript':
    case 'subscript':
      return x.children.map(mapParagraphContent).join('')
    case 'code':
    case 'verbatim':
    case 'text':
      return x.value
    case 'timestamp':
      return x.rawValue
    case 'footnote-reference':
      return x.label
    case 'latex-fragment':
      return x.value
    case 'entity':
      return x.name
    case 'table-cell':
      return 'CELL'
    default:
      //return assertExhaustive(x)
      return ''
  }
}

function reduceParagraph(acc: FDocument, x: Paragraph): FDocument {
  const paragraphText = x.children.map(mapParagraphContent, []).join('')
  return {
    ...acc,
    content: [...acc.content, { type: 'Paragraph', content: paragraphText }],
  }
}

// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts#L56
// Link -> RecursiveObject
//function extractObjectType(x: ObjectType): string {
//  switch (x.type) {
//    case 'text':
//      ;(x as Text).value
//    case 'link':
//      ;(x as Link).path
//    default:
//      ''
//  }
//}

//function extractObjectType(x: ObjectType): string {
//  switch (x.type) {
//    case 'link':
//      return 'LINK'
//    default:
//      return assertExhaustive(x)
//  }
//}
//
//function extractParagraph(x: Paragraph): FParagraph | undefined {
//  switch (x.children.length) {
//    case 0:
//      return undefined
//    case 1:
//      return {
//        type: 'Paragraph',
//        content: 'TODO: Just a paragraph, figure this out', // x.children[0].value,
//      }
//    default:
//      // TODO: Handle paragraphs consisting of more than 1 part
//      console.log('Large paragraph', x)
//      return undefined
//  }
//}

function r(acc: FDocument, node: OrgNode, idx: number): FDocument {
  // check for top-level
  console.log('inside', node.type)
  switch (node.type) {
    case 'org-data':
      return acc // do nothing
    case 'keyword':
      return reduceKeyword(acc, node)
    case 'paragraph':
      return reduceParagraph(acc, node)
    //return { ...acc, children: reduceParagraph(acc.content, node) }
    //case 'section':
    //    const x = (node as Section).children
    //    return []
    //default:
    //    return assertexhaustive(node)
  }
  //if (data.type !== "org-data") {
  //    return {
  //        error: `${data.type} invalid type`,
  //        data: OrgFile
  //    }

  //  return data.children.reduce((acc, cur) => {}, {})
  return acc
}

export default function parse(text: string): FDocument {
  const ast = unified().use(parser).parse(text)
  const empty = {
    todoStates: [],
    content: [],
  }
  console.log(ast.type)
  switch (ast.type) {
    case 'org-data':
      // acc, cur, idx, xs
      return (ast as OrgData).children.reduce(r, empty)
  }
  return empty
}
