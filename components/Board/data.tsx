import { v4 as uuidv4 } from 'uuid'
export type TaskDataProps = {
  id: string
  columnId: string
  name: string
  description: string
  attachment?: string
  completed: boolean
  daysLeft: number
  members: Array<{ id: number; name: string; avatar: string }>
}

export interface ColumnDataProps {
  [key: string]: {
    title: string
    tasks: Array<TaskDataProps>
  }
}

export const tasks: Array<TaskDataProps> = [
  {
    id: uuidv4(),
    columnId: '1',
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
    id: uuidv4(),
    columnId: '1',
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
    id: uuidv4(),
    columnId: '1',
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
  {
    id: uuidv4(),
    columnId: '2',
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
    id: uuidv4(),
    columnId: '2',
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
  {
    id: uuidv4(),
    columnId: '3',
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
    id: uuidv4(),
    columnId: '3',
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
    id: uuidv4(),
    columnId: '3',
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
]

export const columnsFromBackend: ColumnDataProps = {
  ['1']: {
    title: 'To-do',
    tasks: tasks.filter(task => task.columnId === '1'),
  },
  ['2']: {
    title: 'In Progress',
    tasks: tasks.filter(task => task.columnId === '2'),
  },
  ['3']: {
    title: 'Done',
    tasks: tasks.filter(task => task.columnId === '3'),
  },
}
