import { Text } from 'grommet'

export type FallbackInlineProps = {
  content: string
}

export default function FallbackInline({ content }: FallbackInlineProps) {
  return (
    <Text as="pre" style={{ display: 'inline' }}>
      {content}
    </Text>
  )
}
