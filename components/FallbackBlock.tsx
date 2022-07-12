import { Text } from 'grommet'

interface FallbackBlockProps {
  content: string
}

export const FallbackBlock = ({ content }: FallbackBlockProps) => {
  return (
    <Text as="pre" style={{ display: 'block' }}>
      {content}
    </Text>
  )
}
