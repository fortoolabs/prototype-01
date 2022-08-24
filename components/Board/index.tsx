import { Fragment, useState, useRef } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Dialog, Transition } from '@headlessui/react'

import { PhotographIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import {
  ArchiveIcon as SolidArchiveIcon,
  ClipboardListIcon as SolidClipboardListIcon,
  DocumentDuplicateIcon as SolidDocumentDuplicateIcon,
  DotsHorizontalIcon as SolidDotsHorizontalIcon,
  EyeIcon as SolidEyeIcon,
  PaperClipIcon as SolidPaperClipIcon,
  PhotographIcon as SolidPhotographIcon,
  PlusIcon as SolidPlusIcon,
  SelectorIcon as SolidSelectorIcon,
} from '@heroicons/react/solid'

import { columnsFromBackend } from './data'
import BoardColumn from './Column'

// import { FDocument } from 'core/types'

type KanbanBoardProps = {
  data: Array<KanbanColumnProps>
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  addTask: (visible: boolean) => any
  editTask: (visible: boolean) => any
}

export function KanbanBoard({ data, addTask, editTask }: KanbanBoardProps) {
  const [columns, setColumns] = useState(columnsFromBackend)

  // todo: include beautiful-dnd -----
  const onDragEnd = (result, columns, setColumns) => {
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
  // ----------------

  // if (doc === undefined) {
  //   // TODO: Implement empty board view
  //   return <span>noop</span>
  // }
  const handleAddTask = (columnId) => {
    console.log('add task in column with id: ', columnId)
    addTask(true)
  }
  const handleEditTask = (taskId) => {
    console.log('edit task with id: ', taskId)
    editTask(true)
  }

  // const { todoStates } = doc
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <div className="flex items-start justify-start px-4 mb-6 space-x-4">
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided, snapshot) => (
                        // TODO: Drill todos down to BoardColumn
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <BoardColumn
                            key={index}
                            id={columnId}
                            index={index}
                            title={column.title}
                            tasks={column.tasks}
                            onAddTask={(columnId) => handleAddTask(columnId)}
                            onEditTask={(taskId) => handleEditTask(taskId)}
                          />
                        </div>
                      )}
                    </Droppable>
                  )
                })}

                <div className="min-w-kanban">
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
export function KanbanModal({
  title,
  children,
  isVisible,
  show,
  hide,
}: KanbanModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   submit()
  // }

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={hide}
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
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-2xl sm:my-8 sm:max-w-xl sm:w-full">
                <div className="flex items-center justify-between p-4 border-b rounded-t md:px-6 dark:border-gray-700">
                  <Dialog.Title
                    as="div"
                    className="text-xl font-semibold dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                    ref={cancelButtonRef}
                    onClick={() => hide()}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

// FIXME: Look at KanbanAddTaskModal for inspiration
export function KanbanEditTaskModal({
  isVisible,
  show,
  hide,
  submit,
}: KanbanModalProps) {
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   submit()
  // }

  return (
    <KanbanModal
      title="Edit task"
      isVisible={isVisible}
      show={show}
      hide={hide}
    >
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
                  src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
                  alt="Bonnie Green"
                />
              </a>
              <div
                id="bonnie-tooltip"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
              >
                Bonnie Green
                <div className="tooltip-arrow" data-popper-arrow />
              </div>
              <a
                href="#"
                data-tooltip-target="roberta-tooltip"
                className="-mr-3"
              >
                <img
                  className="border-2 border-white rounded-full h-7 w-7 dark:border-gray-800"
                  src="https://flowbite.com/application-ui/demo/images/users/roberta-casas.png"
                  alt="Roberta Casas"
                />
              </a>
              <div
                id="roberta-tooltip"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
              >
                Roberta Casas
                <div className="tooltip-arrow" data-popper-arrow />
              </div>
              <a
                href="#"
                data-tooltip-target="michael-tooltip"
                className="-mr-3"
              >
                <img
                  className="border-2 border-white rounded-full h-7 w-7 dark:border-gray-800"
                  src="https://flowbite.com/application-ui/demo/images/users/michael-gough.png"
                  alt="Michael Gough"
                />
              </a>
              <div
                id="michael-tooltip"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
              >
                Michael Gough
                <div className="tooltip-arrow" data-popper-arrow />
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
            I made some wireframes that we would like you to follow since we are
            building it in Google’s Material Design (Please learn more about
            this and see how to improve standard material design into something
            beautiful). But besides that, you can just do it how you like.
          </p>
          <p>
            Next Friday should be done. Next Monday we should deliver the first
            iteration. Make sure, we have a good result to be delivered by the
            day.
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
            />
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
                src="https://flowbite.com/application-ui/demo/images/users/michael-gough.png"
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
              Latest clicks/conversions. Where you currently have the logo for
              merchant, we should instead have a logo that represent the
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
          className="inline-flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 border border-primary-700 hover:border-primary-800 font-semibold rounded-lg text-sm py-2.5 text-center"
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
    </KanbanModal>
  )
}

export function KanbanAddTaskModal({
  isVisible,
  show,
  hide,
  submit,
}: KanbanModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <KanbanModal title="Add task" isVisible={isVisible} show={show} hide={hide}>
      <form onSubmit={onSubmit}>
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
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label className="flex items-center justify-center w-full h-32 text-gray-500 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
              <div className="flex items-center justify-center space-x-2">
                <PhotographIcon className="w-8 h-8" stroke="currentColor" />
                <p className="text-base">Drop files to upload</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex items-center p-4 space-x-3 border-t border-gray-200 rounded-b md:p-6 dark:border-gray-700">
          <button
            type="submit"
            className="w-32 inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 border border-blue-700 hover:border-blue-800 font-semibold rounded-lg text-sm py-2.5 text-center"
          >
            <SolidPlusIcon className="w-5 h-5 mr-2" />
            Add Card
          </button>
          <button
            type="button"
            ref={cancelButtonRef}
            onClick={() => hide()}
            className="w-24 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </KanbanModal>
  )
}

export default function KanbanSpace({ data }: KanbanSpaceProps) {
  const [isEdit, setEdit] = useState(true)
  const [isAdd, setAdd] = useState(false)
  console.log('state,', isEdit)

  return (
    <div className="flex pt-16 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
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
