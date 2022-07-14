import { unified } from 'unified'
import parser from 'uniorg-parse'
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
import { OrgNode } from 'uniorg'

//const parse = (text: string) => unified().use(parser).parse(text)
const parse = (text: string) => {
  const ast = unified().use(parser).parse(text)
  return `looking at ${typeof ast}`
}

type OrgParagraph = {
  type: 'Paragraph'
  content: string
}

type OrgHeading = {
  type: 'Heading'
  content: string
}

type OrgElement = OrgParagraph | OrgHeading

type OrgFile = {
  title?: string
  todoStates: Array<string>
  content: Array<OrgElement>
}

const uniorgFilter = (data: OrgNode): boolean => true

export function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch',
): never {
  throw new Error(message)
}

const uniorgTranslate = (node: OrgNode) => {
  // check for top-level
  switch (node.type) {
    case 'org-data':
      return []
    //case 'section':
    //    const x = (node as Section).children
    //    return []
    //default:
    //    return assertExhaustive(node)
  }
  //if (data.type !== "org-data") {
  //    return {
  //        error: `${data.type} invalid type`,
  //        data: OrgFile
  //    }

  //  return data.children.reduce((acc, cur) => {}, {})
  return []
}

export default parse
