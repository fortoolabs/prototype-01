export type FallbackBlockProps = {
  children: string
  border?: boolean
}

export default function FallbackBlock({ children,border }: FallbackBlockProps) {
  return (
    <pre className={`p-2 rounded bg-gray-300/30 ${border ? 'border border-gray-400/40' : ''}`}>
      {children}
    </pre>
  )
}
