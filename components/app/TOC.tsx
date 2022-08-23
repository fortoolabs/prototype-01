import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'

type TOCHeading = {
  heading: string
  children?: Array<TOCHeading>
}

export type TOCProps = {
  headings: FNestedTableOfContents
}

// TODO: Use Disclosure to support folding
type TableOfContentsEntryProps = {
  entry: FNestedTableOfContentsEntry
  depth: number
}

function TableOfContentsEntry({
  entry: { children, plaintext },
  depth,
}: TableOfContentsEntryProps) {
  return (
    <li className="py-2 w-full">
      <a href="#test-anchor">{plaintext}</a>
      {children !== [] && (
        <ul className={`px-${2 * depth}`}>
          {children.map((heading, idx) => (
            <TableOfContentsEntry key={idx} entry={heading} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function TOC({ headings }: TOCProps) {
  if (!headings.length) return null
  return (
    <ul className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
      {headings.map((heading, idx) => (
        <TableOfContentsEntry key={idx} entry={heading} depth={1} />
      ))}
    </ul>
  )
}
