import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'

type TOCHeading = {
  heading: string
  children?: Array<TOCHeading>
}

export type TOCProps = {
  headings: FNestedTableOfContents
}

// TODO: Refactor into React Component and key mapped elements
// TODO: Use Disclosure to support folding
const recurList = (
  { plaintext, children }: FNestedTableOfContentsEntry,
  depth: number,
) => {
  return (
    <li className="py-2 w-full">
      <a href="#test-anchor">{plaintext}</a>
      {children !== [] && (
        <ul className={`px-${2 * depth}`}>
          {children.map((child) => recurList(child, depth + 1))}
        </ul>
      )}
    </li>
  )
}

export default function TOC({ headings }: TOCProps) {
  if (!headings.length) return null
  return (
    <ul className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
      {headings.map((item) => {
        return recurList(item, 1)
      })}
    </ul>
  )
}
