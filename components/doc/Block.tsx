import { PropsWithChildren } from 'react'

export type FallbackBlockProps = {
  border?: boolean
}

export default function Block({
  children,
}: PropsWithChildren<FallbackBlockProps>) {
  return <div className="p-4">{children}</div>
}
