import { PropsWithChildren, HTMLAttributes, SyntheticEvent } from 'react'
import { ResizableBox, ResizeCallbackData } from 'react-resizable'

type ResizablePaneProps = {
  handlePosition?: 'e' | 'w'
  width?: number
  minWidth?: number
  maxWidth?: number
  visibleHandle?: Boolean
  handleResizeStop?: // eslint-disable-next-line no-unused-vars
  ((e: SyntheticEvent, data: ResizeCallbackData) => any) | undefined
}

// FIXME: @tijan allow for constraint scoping on non-px-basis
// Since max-width-prose is defined in terms of ch units,
// we may want to allow for that.
function ResizablePane({
  handlePosition,
  width,
  minWidth,
  maxWidth,
  visibleHandle = true,
  children,
  className,
  handleResizeStop,
}: PropsWithChildren<ResizablePaneProps> & HTMLAttributes<'div'>) {
  return (
    <ResizableBox
      axis="x"
      className={`${className} ${visibleHandle ? '' : 'invisible-handle'}`}
      width={width || 625}
      minConstraints={[minWidth || 315, 100]}
      maxConstraints={[maxWidth || 930, 300]}
      resizeHandles={[handlePosition ? handlePosition : 'n']}
      onResizeStop={handleResizeStop}
    >
      {children}
    </ResizableBox>
  )
}

export default ResizablePane
