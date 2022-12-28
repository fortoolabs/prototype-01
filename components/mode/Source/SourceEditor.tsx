import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { ViewUpdate } from '@codemirror/view'

export type SourceEditorProps = {
  initialValue: string
  height?: number
  width?: number
  theme?: 'light' | 'dark'
  // eslint-disable-next-line no-unused-vars
  handleChange?: (value: string) => void
}
function SourceEditor({
  initialValue,
  height,
  width,
  theme,
  handleChange,
}: SourceEditorProps) {
  const onChange = React.useCallback(
    // eslint-disable-next-line no-unused-vars
    (value: string, viewUpdate: ViewUpdate) => {
      if (handleChange) {
        handleChange(value)
      }
    },
    [handleChange],
  )
  return (
    <CodeMirror
      value={initialValue}
      height={height ? `${height}px` : 'auto'}
      width={width ? `${width}px` : 'auto'}
      theme={theme || 'dark'}
      onChange={onChange}
    />
  )
}
export default SourceEditor
