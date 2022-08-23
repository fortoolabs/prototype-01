import { v4 as uuidv4 } from 'uuid';
type KanbanColumnProps = {
  id: number
  title: string
  tasks: Array<KanbanTaskProps>
}

export const todoStub = [
    {
      id: '1',
      name: 'Heading',
      data: {
        level: 1,
        title: 'This is some other heading content for heading 1',
        isTodo: true,
        state: 'TODO(t)',
      },
    },
    {
      id: '2',
      name: 'Heading',
      data: {
        level: 1,
        title:
          'This is even more heading content with a longer title for heading 1',
        isTodo: true,
        state: 'TODO(t)',
      },
    },
    {
      id: '3',
      name: 'Heading',
      data: {
        level: 2,
        title: 'This is some other content for heading 2',
        isTodo: true,
        state: 'TODO(t)',
      },
    },
    {
      id: '4',
      name: 'Heading',
      data: {
        level: 3,
        title: 'This is some other content for heading 3',
        isTodo: true,
        state: 'IN_SCOPING',
      },
    },
    {
      id: '5',
      name: 'Heading',
      data: {
        level: 4,
        title: 'This is some other content for heading 4',
        isTodo: true,
        state: 'IN_DEV',
      },
    },
    {
      id: '6',
      name: 'Heading',
      data: {
        level: 5,
        title: 'This is some other content for heading 5',
        isTodo: true,
        state: 'DONE(d)',
      },
    },
  ]

export const columnsStub: Array<KanbanColumnProps> = [
  {
    id: '1',
    title: 'To Do',
    tasks: [
      {
        id: uuidv4(),
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
    id: '2',
    title: 'In Progress',
    tasks: [
      {
        id: uuidv4(),
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
    id: '3',
    title: 'Done',
    tasks: [
      {
        id: uuidv4(),
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