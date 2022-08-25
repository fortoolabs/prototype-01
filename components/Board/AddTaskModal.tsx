import { useRef } from 'react'

// import type { KanbanModalProps } from './Modal'
import KanbanModal from './Modal'

import { PhotographIcon } from '@heroicons/react/outline'
import { PlusIcon as SolidPlusIcon } from '@heroicons/react/solid'

export default function KanbanAddTaskModal({
  isVisible,
  show,
  hide,
  submit,
}: {
  isVisible: boolean
  show: any
  hide: any
  submit: any
}) {
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
