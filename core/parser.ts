import { unified } from 'unified'
import uniorgParser from 'uniorg-parse'
import { parse as uniorgBasicParse } from 'uniorg-parse/lib/parser'
import { defaultOptions } from 'uniorg-parse/lib/parse-options'

// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg/src/index.ts
// https://github.com/rasendubi/uniorg/blob/master/packages/uniorg-parse/src/parser.ts#L4
import {
  OrgData,
  ObjectType,
  GreaterElementType,
  Headline,
  ElementType,
  ListItem,
} from 'uniorg'

import {
  FDocument,
  FObjectType,
  FElementType,
  FList,
  FListItem,
  FRecursiveObject,
  FHeading,
  FTableOfContents,
  FNestedTableOfContents,
  FHeadingIndex,
  emptyDocument,
} from 'core/types'

import { nanoid } from 'nanoid'

// TODO: Potentially clean up by letting users import types directly
export type { FDocument }

/* eslint: no-unused-vars ["error", {"args": "none"}] */
type NextIdentifierGenerator = (x?: FElementType) => string
type Context = {
  text: string
  nextId: NextIdentifierGenerator
  headingSlugToIdIndex: FHeadingIndex
}

function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch',
): never {
  throw new Error(message)
}

export function extractSlug(text: string): string {
  // https://stackoverflow.com/a/1054862/685195
  return text
    .toLowerCase()
    .replace(/[^\w-]+/g, ' ')
    .trim()
    .replace(/ /g, '-')
}

export function generateNextSlug(
  index: FHeadingIndex,
  anyText: string,
  upperCounter: number = 100,
): string {
  const text = extractSlug(anyText)

  for (let i = 0; i < upperCounter; i++) {
    let slug = i === 0 ? text : `${text}-${i}`
    if (slug in index === false) {
      return slug
    }
  }

  // Assuming that nanoid will not collide
  return `${text}-${nanoid()}`
}

export function updateHeadingsIndexInDocument(doc: FDocument): FDocument {
  const x = extractFlatHeadings(doc.content).reduce((acc, cur) => {
    const index = acc.headingSlugToIdIndex
    const nextSlug = generateNextSlug(
      index,
      extractHeadingSlugBase(cur.heading),
    )

    return {
      ...acc,

      headingSlugToIdIndex: {
        ...index,
        [nextSlug]: cur.heading.id,
      },

      headingIdToSlugIndex: {
        ...acc.headingIdToSlugIndex,
        [cur.heading.id]: nextSlug,
      },

      headingFuzzyToIdIndex: {
        ...acc.headingFuzzyToIdIndex,
        [extractHeadingLinkText(cur.heading)]: cur.heading.id,
      },
    }
  }, doc)

  return x
}

export function extractHeadingsIndex(doc: FDocument): FHeadingIndex {
  return updateHeadingsIndexInDocument(doc).headingSlugToIdIndex
}

// TODO: Refactor to include exhaustiveness check
// Extract unformatted text (which may be useful to compose ids)
export function extractText(
  el: FObjectType | FElementType | FListItem,
): string {
  switch (el.type) {
    case 'Z':
      // TODO: Implement unformatted form for timestamp
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
    case 'e':
    case '#': // comment
    case '/': // comment
    case '{': // code
      return el.content
    default:
      // TODO: Deal with empty content scenarios, e.g.: link [[https://www.example.com]]
      // This will likely warrant changing the return type to: string | undefined
      return el.content.map(extractText).join('')
  }
}

// TODO: Refactor to include exhaustiveness check
export function extractFormattedText(
  el: FObjectType | FElementType | FListItem,
): FObjectType[] {
  switch (el.type) {
    case 'a':
    case 'b':
    case 'i':
    case 'c':
    case 'v':
    case '+':
    case 'u':
    case '^':
    case '_':
    case 't':
    case 'X':
      return [el]
    case 'Z':
    // TODO: Implement formatted form for timestamp
    case 'f':
    // Ignore footnote reference
    case '?':
    // Ignore entity
    case 'C':
      // Ignore table cell
      return []
    case 'E':
    case 'e':
    case '#':
    case '/':
    case '{':
      // Ignore fallbacks
      return []
    default:
      return el.content.flatMap(extractFormattedText)
  }
}

// Extract a flat list of headlines
export function extractFlatHeadings(
  els: FElementType[],
  depth?: number,
): FTableOfContents {
  return els.reduce((acc: FTableOfContents, val) => {
    switch (val.type) {
      case 'S':
        return [...acc, ...extractFlatHeadings(val.content, depth)]
      case 'h':
        // Return all headings when depth is undefined
        // Otherwise, if return heading if the level fits the depth constraint
        if (depth === undefined || (depth && val.level <= depth)) {
          return [
            ...acc,
            {
              heading: val,
              text: extractFormattedText(val),
              plaintext: extractText(val),
            },
          ]
        } else return acc
      default:
        return acc
    }
  }, [])
}

// Extract a nested list of headlines
export function extractNestedHeadings(
  els: FElementType[],
  depth?: number,
): FNestedTableOfContents {
  return els.reduce((acc: FNestedTableOfContents, val) => {
    switch (val.type) {
      case 'S':
        const [entry, ...rest] = extractNestedHeadings(val.content, depth)
        if (entry !== undefined) {
          return [...acc, { ...entry, children: rest }]
        }
        return acc
      case 'h':
        if (depth === undefined || (depth && val.level <= depth)) {
          return [
            ...acc,
            {
              heading: val,
              text: extractFormattedText(val),
              plaintext: extractText(val),
              children: [],
            },
          ]
        } else return acc
      default:
        return acc
    }
  }, [])
}

export function extractTasks(els: FElementType[]): FTableOfContents {
  return els.reduce((acc: FTableOfContents, val) => {
    switch (val.type) {
      case 'S':
        const tasks = extractTasks(val.content)
        const [top, ...rest] = tasks

        // If top-level heading is a task, just show that and ignore the children
        if (top && top.heading.todoKeyword !== null) {
          return [...acc, top]
        }

        // Skip top-level heading if it is not a task in order to show children
        if (rest) {
          return [...acc, ...rest]
        }

        return acc

      case 'h':
        return [
          ...acc,
          {
            heading: val,
            text: extractFormattedText(val),
            plaintext: extractText(val),
          },
        ]

      default:
        return acc
    }
  }, [])
}

type WorkflowStateTransitionConfig = {
  isAnnotated: boolean
  isTimestamped: boolean
}
export type WorkflowStateConfig = {
  name: string
  shortcut: string
  onEntry: WorkflowStateTransitionConfig
  onExit: WorkflowStateTransitionConfig
}
export function unpackTodoKeyword(raw: string): WorkflowStateConfig {
  const split = raw.split('(', 2)

  const name = split && split[0] && split[0] !== '' ? split[0] : ''
  const settings =
    split && split[1] && split[1] !== ''
      ? split[1].replaceAll(')', '').replaceAll('(', '')
      : ''

  const [entryString, exitString] = settings.split('/', 2)

  const shortcut =
    entryString && entryString !== ''
      ? entryString.replaceAll('!', '').replaceAll('@', '').trim().charAt(0)
      : ''

  return {
    name,
    shortcut,
    onEntry: {
      isAnnotated: entryString && entryString.includes('@') ? true : false,
      isTimestamped:
        entryString && (entryString.includes('@') || entryString.includes('!'))
          ? true
          : false,
    },
    onExit: {
      isAnnotated: exitString && exitString.includes('@') ? true : false,
      isTimestamped:
        exitString && (exitString.includes('@') || exitString.includes('!'))
          ? true
          : false,
    },
  }
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

function unpackElementWithContext(ctx: Context) {
  return (x: GreaterElementType | ElementType) => unpackElementType(ctx, x)
}

function unpackElementType(
  ctx: Context,
  x: GreaterElementType | ElementType,
): FElementType[] {
  const { text, nextId } = ctx

  switch (x.type) {
    // GreaterElementType
    case 'org-data':
      return []
    case 'section':
      return [
        {
          type: 'S',
          content: x.children.flatMap(unpackElementWithContext(ctx)),
        },
      ]
    case 'plain-list':
      return [
        {
          type: 'L',
          variant: x.listType,
          content: x.children.map((x) => unpackListItem(ctx, x)),
        },
      ]
    case 'list-item':
      // TODO: Explore whether white-space termination is problematic
      // This is largely in-line with the way that org-element.el parses lists
      return [unpackListItem(ctx, x)]
    case 'property-drawer':
    case 'drawer':
    case 'quote-block':
    case 'verse-block':
    case 'center-block':
    case 'special-block':
    case 'footnote-definition':
      // TODO: Implement instead of falling back
      return [
        { type: 'E', content: text.slice(x.contentsBegin, x.contentsEnd) },
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
      return [unpackHeading(ctx, x)]
    case 'comment-block':
      return [{ type: '#', content: x.value }]
    case 'comment':
      return [{ type: '/', content: x.value }]
    case 'src-block':
      return [{ type: '{', content: x.value }]
    case 'planning':
    case 'node-property':
    case 'list-item-tag':
    case 'example-block':
    case 'export-block':
    case 'keyword':
    case 'table-row':
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

export function removeStatisticsCookies(text: string): string {
  const pattern = /\[[0-9]*(\%|\/[0-9]*)\]/g
  return text
    .replaceAll(pattern, '') // remove statistics cookie
    .replaceAll(/\s+/g, ' ') // collapse whitespace
    .trim()
}

export const extractHeadingText = (x: FHeading): string =>
  x.content.map(extractText).join('')

export const extractHeadingLinkText = (x: FHeading): string =>
  removeStatisticsCookies(extractHeadingText(x))

export const extractHeadingSlugBase = (x: FHeading): string =>
  extractSlug(extractHeadingLinkText(x))

function unpackHeading(ctx: Context, x: Headline): FHeading {
  const { nextId } = ctx
  const content = x.children.map(unpackObjectType)
  const id = nextId()

  return {
    type: 'h',
    id,
    level: x.level,
    todoKeyword: x.todoKeyword,
    commented: x.commented,
    priority: x.priority,
    tags: x.tags,
    content: x.children.map(unpackObjectType),
  }
}

// TODO: Figure out I can't cover this in unpackElementType
// Got type issues while attempting to unpack plain-list in unpackElementType
// - Types of property content are incompatible
// - Type FElementType[] is not assignable to type FListItem[]
// Pulling a noob card to just avoid the issue for now 🤦🏿‍♂️
function unpackListItem(ctx: Context, x: ListItem): FListItem {
  return {
    type: 'I',
    checkbox: x.checkbox,
    content: x.children.flatMap(unpackElementWithContext(ctx)),
  }
}

function convertWithContext(ctx: Context) {
  const { text, nextId } = ctx
  return (
    acc: FDocument,
    node: GreaterElementType | ElementType,
    idx: number,
  ) => convert(ctx, acc, node, idx)
}

// Convert document to internal representation
function convert(
  ctx: Context,
  acc: FDocument,
  node: GreaterElementType | ElementType,
  idx: number,
): FDocument {
  // TODO: Fuse unpackElementType and convert

  // convert is a higher-level abstraction of unpackElementType. It is poorly
  // designed because it reduces on the top-level of the document while we want
  // to run this logic consistently thoughout the depth of the document and
  // potentially reduce to a nested structure.

  // The design problem stems from us wanting to operate on the acc (which is a
  // top-doc structure) while traversing the tree and potentially finding us
  // deep in the document structure (far away from the top). Perhaps the acc
  // should compose top and local structures in a manner in an accessible manner
  // (like a tuple) to provide an API that is easy to work with regardless of
  // the depth of the local node being processed.

  // TODO: Implement fallback for all NOOPs
  switch (node.type) {
    // GreaterElementType
    case 'org-data':
      return node.children.reduce(convertWithContext(ctx), acc)
    case 'section':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(ctx, node)],
      }
    case 'property-drawer':
    case 'drawer':
    case 'plain-list':
    case 'list-item':
    case 'quote-block':
    case 'verse-block':
    case 'center-block':
    case 'special-block':
    case 'comment-block':
    case 'footnote-definition':
    case 'table':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(ctx, node)],
      }

    // TODO: Note that we may not need this at a document level, since all
    // items of type Element items may be contained within a container of type
    // GreaterElement

    // ElementType
    case 'headline':
      const headline = unpackHeading(ctx, node)

      return {
        ...acc,
        content: [...acc.content, headline],
      }
    case 'src-block':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(ctx, node)],
      }
    case 'planning':
    case 'node-property':
    case 'list-item-tag':
    case 'example-block':
    case 'export-block':
      return acc // noop
    case 'keyword':
      switch (node.key) {
        case 'TITLE':
          return { ...acc, title: node.value }
        case 'TYP_TODO':
        case 'SEQ_TODO':
        case 'TODO':
          // https://orgmode.org/manual/Per_002dfile-keywords.html
          const [activeStatesLabels, terminalStatesLabels] =
            node.value.split('|')
          const activeStates = (activeStatesLabels || [])
            .trim()
            .split(' ')
            .map((x) => ({ label: unpackTodoKeyword(x).name, isActive: true }))
          const terminalStates = (terminalStatesLabels || [])
            .trim()
            .split(' ')
            .map((x) => ({ label: unpackTodoKeyword(x).name, isActive: false }))

          return {
            ...acc,
            todoStates: [
              ...new Set([
                ...acc.todoStates,
                ...node.value
                  .split(' ')
                  .filter((x) => x != '|')
                  .map((x) => unpackTodoKeyword(x).name),
              ]),
            ],
            workflows: [...acc.workflows, [...activeStates, ...terminalStates]],
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
        content: [...acc.content, ...unpackElementType(ctx, node)],
      }
    case 'paragraph':
      return {
        ...acc,
        content: [...acc.content, ...unpackElementType(ctx, node)],
      }
    default:
      return assertExhaustive(node)
  }
}

export default function parse(
  text: string,
  nextId: NextIdentifierGenerator = () => 'this-is-not-a-valid-id',
): FDocument {
  const earlyDoc = convert(
    { text, nextId: () => 'this-is-not-a-valid-id', headingSlugToIdIndex: {} },
    emptyDocument,
    unified().use(uniorgParser).parse(text) as OrgData,
    0,
  )
  const updatedOptions = {
    todoKeywords: [
      ...new Set([...earlyDoc.todoStates, ...defaultOptions.todoKeywords]),
    ],
  }

  const ast = uniorgBasicParse(text, updatedOptions)

  // FIXME: Debug why the parse pipeline breaks (see test output)
  //const ast = unified().use(uniorgParser, updatedOptions).parse(text) as OrgData

  return updateHeadingsIndexInDocument(
    convert({ text, nextId, headingSlugToIdIndex: {} }, emptyDocument, ast, 0),
  )
}
