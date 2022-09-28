import { PropsWithChildren, HTMLAttributes } from 'react'

export type FallbackBlockProps = {
  border?: boolean
  active?: boolean
}

export const blockClasses = [
  'transition duration-0 hover:duration-150', //transition
  'hover:bg-gray-100 target:bg-gray-100', // bg
  'text-gray-600 hover:text-black', // text
  'rounded-md ring-inset hover:ring-1 target:ring-1 hover:ring-gray-300 target:ring-gray-300', // border
].join(' ')

export default function Block({
  className = blockClasses,
  active = false,
  children,
}: PropsWithChildren<FallbackBlockProps> & HTMLAttributes<'div'>) {
  const activeClasses = 'bg-gray-100 text-black ring-1 ring-gray-300'
  return (
    <div className={`p-2 md:p-4 ${className} ${active && activeClasses}`}>
      {children}
    </div>
  )
}
