import { PropsWithChildren, HTMLAttributes } from 'react'

export type FallbackBlockProps = {
  border?: boolean
}

export const blockClasses = [
  'transition duration-0 hover:duration-150', //transition
  'hover:bg-gray-100', // bg
  'text-gray-600 hover:text-black', // text
  'rounded-md' // border
].join(' ')

export default function Block({
  className = blockClasses,
  children,
}: PropsWithChildren<FallbackBlockProps> & HTMLAttributes<'div'>) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
