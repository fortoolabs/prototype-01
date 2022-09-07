import { PropsWithChildren } from 'react'

export type FallbackBlockProps = {
  border?: boolean
}

export default function FallbackBlock({
  children,
  border,
}: PropsWithChildren<FallbackBlockProps>) {
  return (
    <pre
      className={`overflow-auto p-2 rounded bg-gray-300/30 ${
        border ? 'border border-gray-400/40' : ''
      }`}
    >
      {children}
    </pre>
  )
}
