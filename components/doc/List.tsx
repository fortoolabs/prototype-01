import { PropsWithChildren, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { FElementType } from 'core/types'

export type ListProps = {}
export type ListChildProps = {
  content: FElementType[]
}

export function List({ children }: PropsWithChildren<ListProps>) {
  return <ul className="pl-10 my-1">{children}</ul>
}
export function ListChild({
  content,
  children,
}: PropsWithChildren<ListChildProps>) {
  const [showChildren, setShowChildren] = useState(true)

  const hasChildren = content.flatMap((el) => el).length > 1

  const animation =
    '[&>ul]:overflow-hidden [&>ul]:transition-[max-height] [&>ul]:duration-700 [&>ul]:delay-100 [&>ul]:ease-in-out'

  const handleClick = () => {
    setShowChildren(!showChildren)
  }
  return (
    <li
      className={[
        'relative h-fit',
        showChildren
          ? `[&>ul]:max-h-screen ${animation}`
          : `[&>ul]:max-h-0 ${animation} [&>p]:hidden [&>p:first-child]:block`,
        hasChildren ? 'first:list-none' : 'list-disc',
      ].join(' ')}
    >
      {children}
      {hasChildren && (
        <ChevronUpIcon
          className={[
            'absolute',
            'top-0',
            '-left-6',
            'h-5',
            'w-5',
            'cursor-pointer',
            'select-none',
            'transition',
            showChildren ? '' : 'rotate-180 transition delay-75',
          ].join(' ')}
          onClick={handleClick}
        />
      )}
    </li>
  )
}
