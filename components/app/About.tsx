import { Fragment } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/20/solid'

export type ShowAboutModalProps = {
  showModal?: boolean
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
}

type AboutListProps = {
  entries: Array<{ title: string; content: string }>
}

type AboutMetadataProps = {
  version: string
}

const About = ({
  setShowModal,
  showModal,
  entries,
  version,
}: ShowAboutModalProps & AboutListProps & AboutMetadataProps) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          if (setShowModal) {
            setShowModal(false)
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-right justify-end text-center">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
              enterFrom="transform opacity-0 scale-110"
              enterTo="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
              leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
              leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
              leaveTo="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
            >
              <Dialog.Panel className="w-full pt-10 max-w-md transform overflow-hidden md:rounded-tl-2xl md:rounded-bl-2xl h-screen bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-5">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    formation.tools
                  </Dialog.Title>
                  <button
                    type="button"
                    className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    onClick={() => {
                      if (setShowModal) {
                        setShowModal(false)
                      }
                    }}
                  >
                    <span className="sr-only">Close main menu</span>
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    A productivity, collaboration and knowledge-management
                    front-end to a platform that is API-centric, ChatOps-centric
                    and plaintext-centric.
                  </p>
                </div>

                <div className="w-full px-0 pt-10">
                  <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                    {entries.map((x, id) => {
                      return (
                        <Disclosure key={id} as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium  hover:bg-gray-200 ">
                                <span>{x.title}</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                {x.content}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-4 bottom-0 sticky top-[100vh]">
                  <div className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200">
                    {version}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default About
