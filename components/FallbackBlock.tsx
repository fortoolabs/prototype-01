import { Text } from 'grommet'

export type FallbackBlockProps = {
  children: string
}

export default function FallbackBlock({ children }: FallbackBlockProps) {
  return (
    <Text as="pre" style={{ display: 'block' }}>
      {children}
    </Text>
  )
}
