import { Text } from 'grommet'

interface FallbackInlineProps {
  content: string
}

export const FallbackInline = ({ content }: FallbackInlineProps) => {
  return (
    <Text as="pre" style={{ display: 'inline' }}>
      {content}
    </Text>
  )
}
