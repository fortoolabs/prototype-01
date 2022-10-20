import React from 'react'
import { ResizableBox } from 'react-resizable'

type ResizablePaneProps = {
  content: React.ReactNode
  handlePosition?: 'e' | 'w'
}
function ResizablePane({ content, handlePosition }: ResizablePaneProps) {
  return (
    <ResizableBox
      axis="x"
      width={625}
      minConstraints={[315, 100]}
      maxConstraints={[930, 300]}
      resizeHandles={[handlePosition ? handlePosition : 'n']}
    >
      <div className="p-2">{content}</div>
    </ResizableBox>
  )
}

export default ResizablePane
