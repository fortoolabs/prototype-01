import { useState } from 'react'

import KanbanBoard from './Board'
import KanbanAddTaskModal from './AddTaskModal'
import KanbanEditTaskModal from './EditTaskModal'

export default function KanbanSpace({ data }: KanbanSpaceProps) {
  const [isEdit, setEdit] = useState(false)
  const [isAdd, setAdd] = useState(false)

  return (
    <div className="flex pt-16 w-full overflow-x-scroll overflow-y-hidden bg-gray-50 dark:bg-gray-900">
      <KanbanBoard
        data={data}
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
