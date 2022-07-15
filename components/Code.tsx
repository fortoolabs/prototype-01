import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Box } from 'grommet'

export type CodeProps = {
  language: string
  source: string
}

export default function Code({ language, source }: CodeProps) {
  return (
    <Box alignSelf="stretch">
      <SyntaxHighlighter tabIndex="0" wrapLongLines language={language}>
        {source}
      </SyntaxHighlighter>
    </Box>
  )
}
