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
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            ></path>
          </svg>
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
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Done
            </div>
          ) : (
            <div className="flex items-center justify-center px-3 text-sm font-medium text-purple-800 bg-purple-100 rounded-lg dark:bg-purple-200">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {`${daysLeft} days left`}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  return (
    <div className="min-w-kanban">
      <div className="py-4 text-base font-semibold text-gray-900 dark:text-gray-300">
        {title}
      </div>

      <div id={`kanban-list-${id}`} className="mb-4 space-y-4 min-w-kanban">
        {tasks.map((task) => {
          console.log(id, task.id)
          return <KanbanTask key={task.id} {...task} />
        })}
      </div>

      <button
        type="button"
        data-modal-toggle="new-card-modal"
        className="flex items-center justify-center w-full py-2 font-semibold text-gray-500 border-2 border-gray-200 border-dashed rounded-lg hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Add another card
      </button>
    </div>
  )
}

export function KanbanBoard({ data }: KanbanBoardProps) {
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
                  data-modal-toggle="new-card-modal"
                  className="flex items-center justify-center w-full h-32 py-2 m-0 font-semibold text-gray-500 border-2 border-gray-200 border-dashed rounded-lg hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function KanbanSpace({ data }: KanbanBoardProps) {
  return (
    <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <KanbanBoard data={data} />
      <KanbanEditTaskModal />
      <KanbanAddTaskModal />
    </div>
  )
}

function KanbanEditTaskModal() {
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
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
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
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Join
                </button>
                <button
                  type="button"
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center ml-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Attachment
                </button>
              </div>
            </div>
            <div className="inline-flex items-center mb-2 text-lg font-semibold text-center text-gray-900 dark:text-white">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                ></path>
              </svg>
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
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Post comment
                </button>

                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
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
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
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
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Save
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Move
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
              </svg>
              Copy
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                <path
                  fillRule="evenodd"
                  d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Archive
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function KanbanAddTaskModal() {
  return (
    <div
      className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
      id="new-card-modal"
    >
      <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t md:px-6 dark:border-gray-700">
            <div className="text-xl font-semibold dark:text-white">
              Add new task
            </div>
            <button
              type="button"
              data-modal-toggle="new-card-modal"
              className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
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
                    rows="6"
                    className="block w-full text-gray-900 border border-gray-200 rounded-lg bg-gray-50 sm:text-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="On line 672 you define $table_variants. Each instance of 'color-level' needs to be changed to 'shift-color'."
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="flex items-center justify-center w-full h-32 text-gray-500 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
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
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Add Card
                </button>
                <button
                  type="button"
                  data-modal-toggle="new-card-modal"
                  className="w-24 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-lg text-sm py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
