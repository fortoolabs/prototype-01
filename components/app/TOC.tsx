type TOCHeading = {
  heading: string
  children?: any // todo: nested type
}

export type TOCProps = {
    headings: Array<TOCHeading>
}

type depthProps = number

export const TOCStub = [
  {
    heading: 'Part 1',
    children: [
      {
        heading: 'Part 1.1 with a very long title that requires space',
      },
      {
        heading: 'Part 1.2',
        children: [
          {
            heading: 'Part 1.2.1',
          },
        ],
      },
    ],
  },
  {
    heading: 'Part 2',
  },
  {
    heading: 'Part 3',
  },
]

const recurList = (heading: TOCHeading, depth: depthProps) => {
  if (!heading.children || depth > 2)
    return (
      <li className="py-2 w-full">
        <a href="#test-anchor">{heading.heading}</a>
      </li>
    )
  return (
    <>
      <li className="py-2 w-full ">
        <a href="#test-anchor">{heading.heading}</a>
      </li>
      <ul className={`px-${2 * depth}`}>
        {heading.children.map((child:TOCHeading, depth:depthProps) => recurList(child, depth + 1))}
      </ul>
    </>
  )
}

export default function TOC({headings}: TOCProps) {
  if (!headings.length) return null
  return (
    <ul className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
      {headings.map((item) => {
        return recurList(item, 1)
      })}
    </ul>
  )
}
