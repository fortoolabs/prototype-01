import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export type KanbanModalProps = {
  title: string
  children: any
  isVisible: boolean
  hide: any
  show: any
  submit?: any
}

export default function KanbanModal({
  title,
  children,
  isVisible,
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
