import { unified } from 'unified'
import parser from 'uniorg-parse'
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts#L4
import { OrgData, OrgNode } from 'uniorg'

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

function r(acc: FDocument, node: OrgNode, idx: number): FDocument {
  // check for top-level
  console.log('inside', node.type)
  switch (node.type) {
    case 'org-data':
      return acc // do nothing
    case 'keyword':
      return acc
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
