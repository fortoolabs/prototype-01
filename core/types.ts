export type FRecursiveObject = {
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
// TODO: Extend timestamp with relevant fields
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

export type FObjectType =
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

export type FHeading = FRecursiveObject & {
  type: 'h'
  level: number
  todoKeyword?: string
  priority?: string
  commented: boolean
  tags?: string[]
}

type FParagraph = FRecursiveObject & {
  type: 'p'
}

type FElementFallback = {
  type: 'e'
  content: string
}

export type FElement =
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
  | FElementFallback

type FGreaterElementFallback = {
  type: 'E'
  content: string
}

type FSection = {
  type: 'S'
  content: FElementType[]
}

export type FList = {
  type: 'L'
  variant: 'ordered' | 'unordered' | 'descriptive'
  content: FListItem[]
}

export type FListItem = {
  type: 'I'
  checkbox: 'on' | 'off' | 'trans' | null
  content: FElementType[]
}

// TODO: Expand
export type FGreaterElement =
  | FSection
  | FGreaterElementFallback
  | FList
  | FListItem

export type FElementType = FElement | FGreaterElement

export type FDocument = {
  title?: string
  source?: string
  // TODO: Define Todo type? Has annotation (e.g.: comment, shortcut) removed?
  // TODO: Breakdown into list of Todo type items
  todoStates: Array<string>

  // TODO: Compare Array vs Map
  // TODO: Design Map w/ a key-naming scheme for fast start/end/range lookup
  content: Array<FElementType>
}

export type FTableOfContentsEntry = {
  heading: FHeading
  // The text field should be rendered as the TOC text
  text: FObjectType[]
  plaintext: string
}
export type FTableOfContents = FTableOfContentsEntry[]

export type FNestedTableOfContentsEntry = {
  heading: FHeading
  // The text field should be rendered as the TOC text
  text: FObjectType[]
  plaintext: string
  children: FNestedTableOfContentsEntry[]
}
export type FNestedTableOfContents = FNestedTableOfContentsEntry[]

export const emptyDocument = {
  content: [],
  todoStates: [],
}
