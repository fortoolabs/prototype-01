import { useState } from 'react'

import { FDocument } from 'core/types'

import KanbanBoard from './Board'
import KanbanAddTaskModal from './AddTaskModal'
import KanbanEditTaskModal from './EditTaskModal'

// TODO: Remove when addressing the next (state) TODO
import { columnsFromBackend } from './data'

export default function KanbanSpace({ doc }: { doc: FDocument }) {
  const [isEdit, setEdit] = useState(false)
  const [isAdd, setAdd] = useState(false)

  // TODO: Compute this from doc.todoStates and doc.content
  console.log('Use or lose doc', doc)
  const [columns, setColumns] = useState(columnsFromBackend)

  return (
    <div className="flex pt-16 w-full overflow-x-scroll overflow-y-hidden bg-gray-50 dark:bg-gray-900">
      <KanbanBoard
        columns={columns}
        setColumns={setColumns}
        addTask={(isVisible: boolean) => {
          setAdd(isVisible)
        }}
        editTask={(isVisible: boolean) => {
          setEdit(isVisible)
        }}
      />
      <KanbanAddTaskModal
        show={() => setAdd(true)}
        hide={() => setAdd(false)}
        isVisible={isAdd}
        submit={() => console.log('submitting')}
      />
      <KanbanEditTaskModal
        show={() => setEdit(true)}
        hide={() => setEdit(false)}
        isVisible={isEdit}
        submit={() => console.log('')}
      />
    </div>
  )
}
