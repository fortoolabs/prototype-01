import { Fragment } from 'react'
import { Draggable } from 'react-beautiful-dnd'

//import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
//import { PencilIcon as SolidPencilAltIcon } from '@heroicons/react/20/solid'

import Tag from 'components/doc/Tag'

import type { TaskDataProps } from './data'

export type KanbanTaskProps = {
  index: number
  task: TaskDataProps
  onEditTask: any
}

// const limit = (string: string, limit: number) => {
//   if (string.length <= limit) return string
//   return string.substring(0, limit) + '...'
// }

// NOTE: For historic context you should note that this was just sourced from
// Flowbite (a bit of a painful experience, but that's another story). The API
// here is based on the Flowbite example and should actually be adapted to our
// use-case. On account of the lacking time, we have just retrofitted the
// existing setup to just roughly do what we need but by no means consider this
// a candidate solution. It's just a scrappy hack to demonstrate the UI, nothing
// more.
export default function KanbanTask({
  index,
  task,
  onEditTask,
}: KanbanTaskProps) {
  const taskId = task.id

  console.warn(
    'onEditTask has been commented out and we are just referencing it to keep the builder happy',
    onEditTask,
  )

  return (
    <Draggable key={taskId} draggableId={taskId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col max-w-md p-4 transform bg-white border rounded-lg shadow cursor-move dark:bg-gray-800">
            <div className="flex items-center justify-between pb-4">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {task.name}
              </div>

              {/*<button
                type="button"
                data-modal-toggle="kanban-card-modal"
                className="p-2 text-sm text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                onClick={() => {
                  onEditTask(taskId)
                }}
              >
                <SolidPencilAltIcon className="w-5 h-5" />
                </button>*/}
            </div>
            {task.attachment && (
              <div className="flex items-center justify-center pb-4">
                <img
                  className="bg-contain rounded-lg"
                  src={`https://flowbite.com/application-ui/demo${task.attachment}`}
                  alt="attachment"
                />
              </div>
            )}

            <div className="flex flex-col">
              <div className="pb-4 text-sm font-normal text-gray-700 dark:text-gray-400">
                {task.description}
              </div>

              <div className="flex justify-between">
                <div className="flex flex-wrap w-full overflow-items-center gap-2 justify-start">
                  {task.tags.map((tag, idx) => (
                    <Tag key={idx} size="small" content={tag} color="pink" />
                  ))}
                  {task.members.map((member, index) => {
                    const { id, avatar, name } = member
                    return (
                      <Fragment key={index}>
                        <a
                          href="#"
                          data-tooltip-target={`user_${taskId}_${id}`}
                          className="-mr-3"
                        >
                          <img
                            className="border-2 border-white rounded-full h-7 w-7 dark:border-gray-800"
                            src={`https://flowbite.com/application-ui/demo/images/users/${avatar}`}
                            alt={member.name}
                          />
                        </a>
                        <div
                          id={`user_${taskId}_${id}`}
                          role="tooltip"
                          className="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          {name}
                          <div className="tooltip-arrow" data-popper-arrow />
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
                {/*
                {task.completed === true ? (
                  <div className="flex items-center justify-center px-3 text-sm font-medium text-green-800 bg-green-100 rounded-lg dark:bg-green-200">
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Done
                  </div>
                ) : (
                  <div className="flex items-center justify-center px-3 text-sm font-medium text-purple-800 bg-purple-100 rounded-lg dark:bg-purple-200">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {`${task.daysLeft} days left`}
                  </div>
                  )}*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
