import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { PlusIcon } from '@heroicons/react/24/outline'

// TODO: Remove
import type { ColumnDataProps } from './data'

// import type { KanbanColumnProps } from './Column'
import KanbanColumn from './Column'

type KanbanBoardProps = {
  columns: ColumnDataProps
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setColumns: (col: any) => void
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  addTask: (visible: boolean) => void
  editTask: (visible: boolean) => void
}

export default function KanbanBoard({
  columns,
  setColumns,
  addTask,
  editTask,
}: KanbanBoardProps) {
  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return

    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.tasks]
      const destItems = [...destColumn.tasks]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.tasks]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      })
    }
  }
  const handleAddTask = (columnId: string) => {
    console.log('add task in column with id: ', columnId, typeof columnId)
    addTask(true)
  }
  const handleEditTask = (taskId: string) => {
    console.log('edit task with id: ', taskId, typeof taskId)
    editTask(true)
  }

  // const { todoStates } = doc

  // ----------------

  // if (doc === undefined) {
  //   // TODO: Implement empty board view
  //   return <span>noop</span>
  // }

  return (
    <DragDropContext
      onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
    >
      <div className="flex flex-col w-full h-full overflow-x-auto overflow-y-hidden">
        <div className="w-full h-full">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-x-auto shadow">
              <div className="flex items-start justify-start px-4 mb-6 space-x-4">
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided, snapshot) => (
                        <div
                          className="h-full"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <KanbanColumn
                            key={index}
                            id={columnId}
                            index={index}
                            title={column.title}
                            tasks={column.tasks}
                            onAddTask={(columnId: string) =>
                              handleAddTask(columnId)
                            }
                            onEditTask={(taskId: string) =>
                              handleEditTask(taskId)
                            }
                            placeholder={provided.placeholder}
                          />
                        </div>
                      )}
                    </Droppable>
                  )
                })}

                <div className="w-72">
                  <div className="py-4 text-base font-semibold text-gray-900">
                    Add another group
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addTask(true)
                    }}
                    className="flex items-center justify-center w-full h-32 py-2 m-0 font-semibold text-gray-500 border-2 border-gray-200 border-dashed rounded-lg hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <PlusIcon className="w-10 h-10" fill="none" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}
