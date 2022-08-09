import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Column from './Column'

import { Row } from 'components/View'

import { HeadingElement } from 'core/renderer'

export type BoardProps = {
  url?: string
}

const states = ['idea', 'todo', 'doing', 'done']

type TodoElement = HeadingElement

const todos: Array<TodoElement> = [
  {
    name: 'Heading',
    data: {
      level: 1,
      title: 'This is some heading content for heading 1',
      isTodo: true,
      state: 'todo',
    },
  },
  {
    name: 'Heading',
    data: {
      level: 1,
      title: 'This is some other heading content for heading 1',
      isTodo: true,
      state: 'todo',
    },
  },
  {
    name: 'Heading',
    data: {
      level: 1,
      title:
        'This is even more heading content with a longer title for heading 1',
      isTodo: true,
      state: 'todo',
    },
  },
  {
    name: 'Heading',
    data: {
      level: 2,
      title: 'This is some other content for heading 2',
      isTodo: true,
      state: 'done',
    },
  },
  {
    name: 'Heading',
    data: {
      level: 3,
      title: 'This is some other content for heading 3',
      isTodo: true,
      state: 'doing',
    },
  },
  {
    name: 'Heading',
    data: {
      level: 4,
      title: 'This is some other content for heading 4',
      isTodo: true,
      state: 'todo',
    },
  },
  {
    name: 'Heading',
    data: {
      level: 5,
      title: 'This is some other content for heading 5',
      isTodo: true,
      state: 'idea',
    },
  },
]

const BoardView = () => {
  // TODO: fix lack of padding on right side when overflow-x
  // TODO: consider data flow. json -> select todos -> pass to column
  return (
    <DndProvider backend={HTML5Backend}>
      <Row flex="grow" gap="medium" justify="start" pad="medium" align="start">
        {states.map((state, i) => (
          <Column
            key={i}
            title={state}
            todos={todos.filter(
              (todo) => todo.data.isTodo && todo.data.state === state,
            )}
          />
        ))}
      </Row>
    </DndProvider>
  )
}

export default BoardView
