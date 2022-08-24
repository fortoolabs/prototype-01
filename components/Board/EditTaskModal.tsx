import type { KanbanModalProps } from './Modal'
import KanbanModal from './Modal'

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

export default function KanbanEditTaskModal({
  isVisible,
  show,
  hide,
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
