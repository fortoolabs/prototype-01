import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'

export type CodeEditorProps = {
  initialValue: string
  height?: number
  width?: number
  theme?: 'light' | 'dark'
  // eslint-disable-next-line no-unused-vars
  handleChange?: (value: string) => void
}
function CodeEditor({
  initialValue,
  height,
  width,
  theme,
  handleChange,
}: CodeEditorProps) {
  // eslint-disable-next-line no-unused-vars
  const onChange = React.useCallback(
    (value: string, viewUpdate: any) => {
      handleChange ? handleChange(value) : null
    },
    [handleChange],
  )
  return (
    <CodeMirror
      value={initialValue}
      height={height ? `${height}px` : 'auto'}
      width={width ? `${width}px` : 'auto'}
      extensions={[markdown({ base: markdownLanguage })]}
      theme={theme || 'dark'}
      onChange={onChange}
    />
  )
}
export default CodeEditor
