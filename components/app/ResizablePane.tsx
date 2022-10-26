import { PropsWithChildren, HTMLAttributes } from 'react'
import { ResizableBox } from 'react-resizable'

type ResizablePaneProps = {
  handlePosition?: 'e' | 'w'
  width?: number
  minWidth?: number
  maxWidth?: number
  visibleHandle?: Boolean
}
function ResizablePane({
  handlePosition,
  width,
  minWidth,
  maxWidth,
  visibleHandle = true,
  children,
  className,
}: PropsWithChildren<ResizablePaneProps> & HTMLAttributes<'div'>) {
  return (
    <ResizableBox
      axis="x"
      className={`${className} ${visibleHandle ? '' : 'invisible-handle'}`}
      width={width || 625}
      minConstraints={[minWidth || 315, 100]}
      maxConstraints={[maxWidth || 930, 300]}
      resizeHandles={[handlePosition ? handlePosition : 'n']}
    >
      {children}
    </ResizableBox>
  )
}

export default ResizablePane
