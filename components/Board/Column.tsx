import KanbanTask from './Task'

import type { TaskDataProps } from './data'

import { colorForWorkflowState, WorkflowStateColor } from 'core/renderer'
import { PlusIcon as SolidPlusIcon } from '@heroicons/react/20/solid'
import { todoElement } from 'components/doc/Heading'

export type KanbanColumnProps = {
  id: string
  index: number
  title: string
  tasks: Array<TaskDataProps>
  onAddTask: any
  onEditTask: any
  placeholder: any
}

function columnColor(color: WorkflowStateColor): string {
  switch (color) {
    case 'red':
      return 'bg-red-50'
    case 'green':
      return 'bg-green-50'
    case 'gray':
      return 'bg-gray-50'
    default:
      return 'bg-yellow-50'
  }
}

function ringColor(color: WorkflowStateColor): string {
  switch (color) {
    case 'red':
      return 'hover:ring-red-300'
    case 'green':
      return 'hover:ring-green-300'
    case 'gray':
      return 'hover:ring-gray-300'
    default:
      return 'hover:ring-yellow-300'
  }
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
  const color = colorForWorkflowState(title)
  return (
    <div className="w-72 h-[calc(100vh_-_64px)]">
      <div className="py-4 text-base font-semibold text-gray-900 dark:text-gray-300">
        {todoElement(title, color)}
      </div>

      <div
        id={`kanban-list-${id}`}
        className={[
          'h-[calc(100vh_-_218px)] min-w-kanban', // dimensioning
          'mb-4 space-y-4 p-4', // spacing
          columnColor(color), // background coloring
          'overflow-y-auto flex-grow', // flowing
          'rounded ring-0 hover:ring-2', // shaping/contouring
          ringColor(color), // contour/ring coloring
        ].join(' ')}
      >
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
        {placeholder}
      </div>
      {/* TODO: Remove data-modal-toggle */}
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
