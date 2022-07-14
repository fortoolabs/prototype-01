import { unified } from 'unified'
import parser from 'uniorg-parse'
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts#L4
import { OrgData, OrgNode, Keyword } from 'uniorg'

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

function r(acc: FDocument, node: OrgNode, idx: number): FDocument {
  // check for top-level
  console.log('inside', node.type)
  switch (node.type) {
    case 'org-data':
      return acc // do nothing
    case 'keyword':
      return reduceKeyword(acc, node)
  }
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
