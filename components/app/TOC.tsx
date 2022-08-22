export type TOCProps = {
  heading: string
  children: any // todo: nested type
}

export type depthProps = 1 | 2 | 3

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

const recurList = (heading: TOCProps, depth: depthProps) => {
  if (!heading.children)
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
        {heading.children.map((child) => recurList(child, depth + 1))}
      </ul>
    </>
  )
}

export default function TOC({ list }: TOCProps[]) {
  if (!list.length) return null
  return (
    <ul className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
      {list.map((item) => {
        return recurList(item, 1)
      })}
    </ul>
  )
}
