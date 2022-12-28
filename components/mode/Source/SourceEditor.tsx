import React from 'react'
import CodeMirror from '@uiw/react-codemirror'

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
      theme={theme || 'dark'}
      onChange={onChange}
    />
  )
}
export default SourceEditor
