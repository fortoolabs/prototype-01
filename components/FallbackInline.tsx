export type FallbackInlineProps = {
  content: string
  border?: boolean
}

export default function FallbackInline({
  content,
  border,
}: FallbackInlineProps) {
  return (
    <code
      className={`p-2 rounded bg-gray-300/30 ${
        border ? 'border border-gray-400/40' : ''
      }`}
    >
      {content}
    </code>
  )
}
