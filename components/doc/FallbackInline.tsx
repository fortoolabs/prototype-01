import { PropsWithChildren } from 'react'

export type FallbackInlineProps = {
  border?: boolean
}

export default function FallbackInline({
  children,
  border,
}: PropsWithChildren<FallbackInlineProps>) {
  return (
    <code
      className={`p-2 rounded bg-gray-300/30 ${
        border ? 'border border-gray-400/40' : ''
      }`}
    >
      {children}
    </code>
  )
}
