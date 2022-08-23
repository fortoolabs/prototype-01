import { FNestedTableOfContents, FNestedTableOfContentsEntry } from 'core/types'

type TOCHeading = {
  heading: string
  children?: Array<TOCHeading>
}

export type TOCProps = {
  headings: FNestedTableOfContents
}

const recurList = (
  { plaintext, children }: FNestedTableOfContentsEntry,
  depth: number,
) => {
  console.log('children', children, 'depth', depth)
  return (
    <>
      <li className="py-2 w-full">
        <a href="#test-anchor">{plaintext}</a>
      </li>
      {children !== [] && (
        <ul className={`px-${2 * depth}`}>
          {children.map((child) => recurList(child, depth + 1))}
        </ul>
      )}
    </>
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
