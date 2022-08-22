import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ClockIcon,
  PhotographIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline'
import {
  ArchiveIcon as SolidArchiveIcon,
  ClipboardListIcon as SolidClipboardListIcon,
  DocumentDuplicateIcon as SolidDocumentDuplicateIcon,
  DotsHorizontalIcon as SolidDotsHorizontalIcon,
  EyeIcon as SolidEyeIcon,
  PaperClipIcon as SolidPaperClipIcon,
  PencilAltIcon as SolidPencilAltIcon,
  PhotographIcon as SolidPhotographIcon,
  PlusIcon as SolidPlusIcon,
  SelectorIcon as SolidSelectorIcon,
} from '@heroicons/react/solid'

type KanbanTaskProps = {
  id: number
  name: string
  description: string
  attachment?: string
  completed: boolean
  daysLeft: number
  members: Array<{ id: number; name: string; avatar: string }>
}

type KanbanColumnProps = {
  id: number
  title: string
  tasks: Array<KanbanTaskProps>
}

type KanbanBoardProps = {
  data: Array<KanbanColumnProps>
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  addTask: (visible: boolean) => any
}

type KanbanSpaceProps = {
  data: Array<KanbanColumnProps>
}

export const dummyData: Array<KanbanColumnProps> = [
  {
    id: 1,
    title: 'To Do',
    tasks: [
      {
        id: 32,
        name: 'Change charts javascript',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: false,
        daysLeft: 5,
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
      {
        id: 23,
        name: 'Change homepage',
        description: 'Change homepage for Volt Dashboard.',
        completed: false,
        daysLeft: 22,
        attachment: '/images/kanban/task-3.jpg',
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
      {
        id: 65,
        name: 'Change charts javascript',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: false,
        daysLeft: 7,
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    tasks: [
      {
        id: 76,
        name: 'Redesign tables card',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: false,
        daysLeft: 9,
        attachment: '/images/kanban/task-1.jpg',
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
      {
        id: 49,
        name: 'Redesign tables card',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: false,
        daysLeft: 3,
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Done',
    tasks: [
      {
        id: 87,
        name: 'Redesign tables card',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: true,
        daysLeft: 0,
        attachment: '/images/kanban/task-2.jpg',
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
      {
        id: 43,
        name: 'Redesign tables card',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: true,
        daysLeft: 0,
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
      {
        id: 34,
        name: 'Create Javascript elements',
        description:
          'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
        completed: true,
        daysLeft: 0,
        members: [
          {
            id: 1,
            name: 'Bonnie Green',
            avatar: 'bonnie-green.png',
          },
          {
            id: 2,
            name: 'Roberta Casas',
            avatar: 'roberta-casas.png',
          },
          {
            id: 3,
            name: 'Michael Gough',
            avatar: 'michael-gough.png',
          },
        ],
      },
    ],
  },
]

function KanbanTask({
  id,
  name,
  description,
  attachment,
  completed,
  daysLeft,
  members,
}: KanbanTaskProps) {
  const taskId = id
  return (
    <div className="flex flex-col max-w-md p-5 transform bg-white rounded-lg shadow cursor-move dark:bg-gray-800">
      <div className="flex items-center justify-between pb-4">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {name}
        </div>

        <button
          type="button"
          data-modal-toggle="kanban-card-modal"
          className="p-2 text-sm text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
        >
          <SolidPencilAltIcon className="w-5 h-5" />
        </button>
      </div>
      {attachment && (
        <div className="flex items-center justify-center pb-4">
          <img
            className="bg-contain rounded-lg"
            src={`https://flowbite.com/application-ui/demo${attachment}`}
            alt="attachment"
          />
        </div>
      )}

      <div className="flex flex-col">
        <div className="pb-4 text-sm font-normal text-gray-700 dark:text-gray-400">
          {description}
        </div>

        <div className="flex justify-between">
          <div className="flex items-center justify-start">
            {members.map((member) => {
              const { id, avatar, name } = member
              return (
                <>
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
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </>
              )
            })}
          </div>
          {completed === true ? (
            <div className="flex items-center justify-center px-3 text-sm font-medium text-green-800 bg-green-100 rounded-lg dark:bg-green-200">
              <CheckIcon className="w-4 h-4 mr-1" />
              Done
            </div>
          ) : (
            <div className="flex items-center justify-center px-3 text-sm font-medium text-purple-800 bg-purple-100 rounded-lg dark:bg-purple-200">
              <ClockIcon className="w-4 h-4 mr-1" />
              {`${daysLeft} days left`}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  console.log('Render col', id)
  return (
    <div className="min-w-kanban">
      <div className="py-4 text-base font-semibold text-gray-900 dark:text-gray-300">
        {title}
      </div>

      <div id={`kanban-list-${id}`} className="mb-4 space-y-4 min-w-kanban">
        {tasks.map((task) => {
          return <KanbanTask key={task.id} {...task} />
        })}
      </div>

      <button
        type="button"
        data-modal-toggle="new-card-modal"
        className="flex items-center justify-center w-full py-2 font-semibold text-gray-500 border-2 border-gray-200 border-dashed rounded-lg hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <SolidPlusIcon className="w-6 h-6" /> Add another card
      </button>
    </div>
  )
}

export function KanbanBoard({ data, addTask }: KanbanBoardProps) {
  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <div className="flex items-start justify-start px-4 mb-6 space-x-4">
              {data.map((col) => {
                return <KanbanColumn key={col.id} {...col} />
              })}
              <div className="min-w-kanban">
                <div className="py-4 text-base font-semibold text-gray-900">
                  Add another group
                </div>
                <button
                  type="button"
                  onClick={() => {
                    console.log('click')
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
  )
}

type EditTaskModalProps = {}

// FIX: Type ref as RefObject-like
const EditTaskModal = (props: EditTaskModalProps, ref: any) => {
  return (
    <div
      className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
      id="kanban-card-modal"
    >
      <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t md:px-6 dark:border-gray-700">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit task
            </div>
            <button
              type="button"
              data-modal-toggle="kanban-card-modal"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-6">
            <div className="mb-3 text-2xl font-semibold leading-none text-gray-900 dark:text-white">
              Redesign Themesberg Homepage
            </div>
            <div className="flex flex-col items-start justify-center mb-5 space-y-3">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Added by{' '}
                <a className="text-primary-700 no-underline cursor-pointer hover:underline dark:text-primary-500">
                  Bonnie Green
                </a>
                , 22 hours ago
              </div>
              <div className="flex flex-row flex-wrap">
                <div className="flex items-center justify-start">
                  <a
                    href="#"
                    data-tooltip-target="bonnie-tooltip"
                    className="-mr-3"
                  >
                    <img
                      className="border-2 border-white rounded-full h-7 w-7 dark:border-gray-800"
                      src="/images/users/bonnie-green.png"
                      alt="Bonnie Green"
                    />
                  </a>
                  <div
                    id="bonnie-tooltip"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                  >
                    Bonnie Green
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <a
                    href="#"
                    data-tooltip-target="roberta-tooltip"
                    className="-mr-3"
                  >
                    <img
                      className="border-2 border-white rounded-full h-7 w-7 dark:border-gray-800"
                      src="/images/users/roberta-casas.png"
                      alt="Roberta Casas"
                    />
                  </a>
                  <div
                    id="roberta-tooltip"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                  >
                    Roberta Casas
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <a
                    href="#"
                    data-tooltip-target="michael-tooltip"
                    className="-mr-3"
                  >
                    <img
                      className="border-2 border-white rounded-full h-7 w-7 dark:border-gray-800"
                      src="/images/users/michael-gough.png"
                      alt="Michael Gough"
                    />
                  </a>
                  <div
                    id="michael-tooltip"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                  >
                    Michael Gough
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center ml-5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  <SolidPlusIcon className="w-4 h-4 mr-1" />
                  Join
                </button>
                <button
                  type="button"
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center ml-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  <SolidPaperClipIcon className="w-4 h-4 mr-1" />
                  Attachment
                </button>
              </div>
            </div>
            <div className="inline-flex items-center mb-2 text-lg font-semibold text-center text-gray-900 dark:text-white">
              <SolidPaperClipIcon className="w-5 h-5 mr-1" />
              Description
            </div>
            <div className="mb-4 space-y-2 text-base text-gray-500 dark:text-gray-400">
              <p>
                I made some wireframes that we would like you to follow since we
                are building it in Google’s Material Design (Please learn more
                about this and see how to improve standard material design into
                something beautiful). But besides that, you can just do it how
                you like.
              </p>
              <p>
                Next Friday should be done. Next Monday we should deliver the
                first iteration. Make sure, we have a good result to be
                delivered by the day.
              </p>
              <div className="text-sm font-semibold text-primary-700 cursor-pointer w-max hover:underline dark:text-primary-500">
                Show Full Description
              </div>
            </div>
            <div className="w-full mb-4 bg-gray-100 border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600">
              <div className="p-4">
                <label htmlFor="compose-mail" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="compose-mail"
                  rows={4}
                  className="block w-full px-0 text-base text-gray-900 bg-gray-100 border-0 focus:ring-0 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between p-4 border-t dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-primary-700 hover:bg-primary-800 font-semibold rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                >
                  <SolidPaperClipIcon className="w-4 h-4 mr-1" />
                  Post comment
                </button>

                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <SolidPaperClipIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <SolidPhotographIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <a href="#" className="flex-shrink-0">
                  <img
                    className="rounded-full h-7 w-7"
                    src="/images/users/michael-gough.png"
                    alt="Micheal Gough"
                  />
                </a>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                    Micheal Gough
                  </p>
                  <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                    Product Manager
                  </p>
                </div>
                <a
                  href="#"
                  className="p-1 text-sm text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                >
                  <SolidDotsHorizontalIcon className="w-4 h-4" />
                </a>
              </div>
              <ul className="pl-6 text-xs text-gray-500 list-disc list-outside dark:text-gray-400">
                <li>
                  Latest clicks/conversions. Where you currently have the logo
                  for merchant, we should instead have a logo that represent the
                  referring traffic sources (ex. Google or Facebook). So we’re
                  actually missing a column that should say “Source”. And there
                  should be no icon for the merchants.
                </li>
              </ul>
            </div>
          </div>
          {/* Modal footer */}
          <div className="grid grid-flow-col grid-rows-2 gap-2 p-4 border-t border-gray-200 rounded-b sm:grid-rows-1 md:p-6 dark:border-gray-600">
            <button
              type="button"
              className="inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 border border-primary-700 hover:border-primary-800 font-semibold rounded-lg text-sm py-2.5 text-center"
            >
              <SolidClipboardListIcon className="w-5 h-5 mr-2" />
              Save
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <SolidSelectorIcon className="w-5 h-5 mr-2" />
              Move
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <SolidDocumentDuplicateIcon className="w-5 h-5 mr-2" />
              Copy
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <SolidArchiveIcon className="w-5 h-5 mr-2" />
              Archive
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <SolidEyeIcon className="w-5 h-5 mr-2" />
              Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const KanbanEditTaskModal = React.forwardRef(EditTaskModal)

type AddTaskModalProps = {
  show: () => any
  hide: () => any
}

// FIX: Type ref as RefObject-like
const AddTaskModal = ({ show, hide }: AddTaskModalProps, ref: any) => {
  return (
    <div
      className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
      id="new-card-modal"
    >
      <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
        {/* Modal content */}

        <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          {/*<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">*/}
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t md:px-6 dark:border-gray-700">
            {/* Convert this to heading, maybe h3 */}
            <Dialog.Title
              as="div"
              className="text-xl font-semibold dark:text-white"
            >
              Add new task
            </Dialog.Title>
            <button
              type="button"
              onClick={() => {
                hide()
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <form action="#">
            {/* Modal body */}
            <div className="p-4 space-y-6 md:px-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Redesign Homepage"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-details"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter a description
                  </label>
                  <textarea
                    id="product-details"
                    rows={6}
                    className="block w-full text-gray-900 border border-gray-200 rounded-lg bg-gray-50 sm:text-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="On line 672 you define $table_variants. Each instance of 'color-level' needs to be changed to 'shift-color'."
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="flex items-center justify-center w-full h-32 text-gray-500 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
                  <div className="flex items-center justify-center space-x-2">
                    <PhotographIcon className="w-8 h-8" />
                    <p className="text-base">Drop files to upload</p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
              {/* this div seems to be wrong
                </div> */}
              {/* Modal footer */}
              <div className="flex items-center p-4 space-x-3 border-t border-gray-200 rounded-b md:p-6 dark:border-gray-700">
                <button
                  type="submit"
                  className="w-32 inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 border border-primary-700 hover:border-primary-800 font-semibold rounded-lg text-sm py-2.5 text-center"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Card
                </button>
                <button
                  type="button"
                  ref={ref}
                  className="w-24 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
          {/*</div>*/}
        </Dialog.Panel>
      </div>
    </div>
  )
}

export const KanbanAddTaskModal = React.forwardRef(AddTaskModal)

export default function KanbanSpace({ data }: KanbanSpaceProps) {
  //const [isEdit, setEdit] = useState(false)
  const [isAdd, setAdd] = useState(false)

  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <KanbanBoard
        data={data}
        addTask={(isVisible: boolean) => {
          setAdd(isVisible)
        }}
      />
      <Transition.Root show={isAdd} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setAdd}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {/* Switch to KanbanAddGroupModal */}
                <KanbanAddTaskModal
                  show={() => setAdd(true)}
                  hide={() => setAdd(false)}
                  ref={cancelButtonRef}
                />
                {/*
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setAdd(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setAdd(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
     */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        {/*<KanbanAddTaskModal />*/}
      </Transition.Root>
      {/*<Transition.Root show={isEdit} as={Fragment}>
        <KanbanEditTaskModal />
        </Transition.Root>*/}
    </div>
  )
}
