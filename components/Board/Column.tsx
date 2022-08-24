import KanbanTask, { AddCard } from './Card'
import { Col } from 'components/View'
import { UIHeading, UISubheading } from 'components/generic/UIHeading'

import { PlusIcon as SolidPlusIcon } from '@heroicons/react/solid'

export type BoardColumnProps = {
  title: string
  todos: any
}

type KanbanColumnProps = {
  id: number
  title: string
  tasks: Array<KanbanTaskProps>
  placeholder: any
}

function KanbanColumn({
  id,
  title,
  tasks,
  onAddTask,
  onEditTask,
  placeholder,
}: KanbanColumnProps) {
  console.log('handle id', id)
  return (
    <div className="w-72">
      <div className="py-4 text-base font-semibold text-gray-900 dark:text-gray-300">
        {title}
      </div>

      <div id={`kanban-list-${id}`} className="mb-4 space-y-4 min-w-kanban">
        {tasks.map((task, index) => {
          return (
            <KanbanTask
              key={task.id}
              index={index}
              task={task}
              onEditTask={onEditTask}
            />
          )
        })}
      </div>
      {placeholder}

      <button
        type="button"
        data-modal-toggle="new-card-modal"
        onClick={() => {
          onAddTask(id)
        }}
        className="flex items-center justify-center w-full py-2 font-semibold text-gray-500 border-2 border-gray-200 border-dashed rounded-lg hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <SolidPlusIcon className="w-6 h-6" /> Add another card
      </button>
    </div>
  )
}

export default KanbanColumn
