import { useState } from 'react'

import { FDocument } from 'core/types'

import KanbanBoard from './Board'
import KanbanAddTaskModal from './AddTaskModal'
import KanbanEditTaskModal from './EditTaskModal'

export default function KanbanSpace({ doc }:{doc:FDocument}) {
  const [isEdit, setEdit] = useState(false)
  const [isAdd, setAdd] = useState(false)

  // TODO: use doc as basis for kanban board
  console.log(doc)

  return (
    <div className="flex pt-16 w-full overflow-x-scroll overflow-y-hidden">
      <KanbanBoard
        data={''}
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
