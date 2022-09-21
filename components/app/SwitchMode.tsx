import React from 'react'
import ColumnTriple from 'components/icons/ColumnTriple'
import FileLines from 'components/icons/FileLines'

type SwitchProps = {
  enabled?: string
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setEnabled: (params: string) => void
}

export default function SwitchMode({
  enabled,
  setEnabled,
  className,
}: SwitchProps & React.HTMLAttributes<'div'>) {
  const svgClasses = 'w-5 h-5 shrink-0 transition'
  const buttonClasses = 'p-1.5 rounded-sm'
  const kanbanActive = enabled === 'kanban'
  const proseActive = enabled === 'prose'
  const activeSvg = 'fill-c-blue-main scale-110 transition'
  return (
    <div className={`flex bg-gray-100 p-1 rounded-md w-fit ${className}`}>
      <button
        className={`${buttonClasses} ${kanbanActive && 'bg-white'}`}
        onClick={() => setEnabled('kanban')}
      >
        <ColumnTriple
          className={`${svgClasses} ${kanbanActive && activeSvg}`}
        />
      </button>
      <button
        className={`${buttonClasses}  ${proseActive && 'bg-white'}`}
        onClick={() => setEnabled('prose')}
      >
        <FileLines className={`${svgClasses} ${proseActive && activeSvg}`} />
      </button>
    </div>
  )
}
