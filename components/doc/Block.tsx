import { PropsWithChildren, HTMLAttributes } from 'react'

export type FallbackBlockProps = {
  border?: boolean
}

export const blockClasses = [
  'transition duration-0 hover:duration-150', //transition
  'hover:bg-gray-100', // bg
  'text-gray-600 hover:text-black', // text
  'rounded-md ring-inset hover:ring-1 hover:ring-gray-300', // border
].join(' ')

export default function Block({
  className = blockClasses,
  children,
}: PropsWithChildren<FallbackBlockProps> & HTMLAttributes<'div'>) {
  return <div className={`p-2 md:p-4 ${className}`}>{children}</div>
}
