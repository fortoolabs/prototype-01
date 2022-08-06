import type { FC } from 'react'
import { useContext } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Box, ThemeContext } from 'grommet'

export type CodeProps = {
  language: string
  source: string
}

export type ThemeProps = {
  dark?: boolean
  [x: string]: any
}

const {
  oneDark,
  oneLight,
} = require('react-syntax-highlighter/dist/cjs/styles/prism')

const Code: FC<CodeProps> = (props) => {
  const theme: ThemeProps = useContext(ThemeContext)
  return (
    <Box alignSelf="stretch">
      <SyntaxHighlighter
        style={theme.dark ? oneDark : oneLight}
        wrapLongLines
        language={props.language}
      >
        {props.source}
      </SyntaxHighlighter>
    </Box>
  )
}

export default Code
