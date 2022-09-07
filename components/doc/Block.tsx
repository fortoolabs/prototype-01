import { PropsWithChildren, HTMLAttributes } from 'react'

export type FallbackBlockProps = {
  border?: boolean
}

export default function Block({
  className,
  children,
}: PropsWithChildren<FallbackBlockProps> & HTMLAttributes<'div'>) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
