import { useState } from 'react'

import { FDocument } from 'core/types'

import KanbanBoard from './Board'
import KanbanAddTaskModal from './AddTaskModal'
import KanbanEditTaskModal from './EditTaskModal'

import parse, { extractHeadlines, unpackTodoKeyword } from 'core/parser'

// Extraction of Kanban data is component-specific so it belongs in the component implementation
function extractKanbanData({ todoStates, content }: FDocument) {
  // TODO: Source default states from settings
  const defaultStates = ['TODO', 'DONE']

  const docStates = todoStates.length === 0 ? defaultStates : todoStates

  const headlines = extractHeadlines(content, undefined, true)

  return docStates.reduce((acc, state) => {
    const { name } = unpackTodoKeyword(state)
    return {
      ...acc,

      // Populate workflow state structure
      [name]: {
        title: name,
        tasks: headlines
          .filter((entry) => entry.heading.todoKeyword === name)
          .map((entry) => ({
            // TODO: Abstract id generation into dedicated function
            id: entry.plaintext
              .replace(/\s+/, '-')
              .replace(/[^0-9a-z-]/i, '')
              .toLowerCase(),
            columnId: name,
            name: entry.plaintext,

            // TODO: Add title containing entry.text :: FObjectType[]
            description: '', // TODO: Convert to FObjectType[] and list non-heading section content
            completed: false,
            daysLeft: 0, // TODO: Make optional
            members: [],
          })),
      },
    }
  }, {})
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  it('extracts columns structure from a listing of todos', () => {
    const x = extractKanbanData(
      parse(
        [
          '#+TITLE: Just a test doc',
          '* DONE Stub function',
          '* Not a task',
          '** TODO A simple task',
        ].join('\n'),
      ),
    )

    expect(x).toMatchInlineSnapshot(`
      {
        "DONE": {
          "tasks": [
            {
              "columnId": "DONE",
              "completed": false,
              "daysLeft": 0,
              "description": "",
              "id": "stub-function",
              "members": [],
              "name": "Stub function",
            },
          ],
          "title": "DONE",
        },
        "TODO": {
          "tasks": [
            {
              "columnId": "TODO",
              "completed": false,
              "daysLeft": 0,
              "description": "",
              "id": "a-simple-task",
              "members": [],
              "name": "A simple task",
            },
           ],
          "title": "TODO",
        },
      }
    `)
  })

  describe('given file-specific keywords', () => {
    const text = [
      '#+TITLE: Just a test doc',
      '#+TODO: TODO(t) | DONE(d)',
      '* DONE Stub function',
    ].join('\n')
    it('extracts data', () => {
      expect(extractKanbanData(parse(text))).toMatchInlineSnapshot(`
      {
        "DONE": {
          "tasks": [
            {
              "columnId": "DONE",
              "completed": false,
              "daysLeft": 0,
              "description": "",
              "id": "stub-function",
              "members": [],
              "name": "Stub function",
            },
          ],
          "title": "DONE",
        },
        "TODO": {
          "tasks": [],
          "title": "TODO",
        },
      }
    `)
    })
  })
}

export default function KanbanSpace({ doc }: { doc: FDocument }) {
  const [isEdit, setEdit] = useState(false)
  const [isAdd, setAdd] = useState(false)

  const data = extractKanbanData(doc)
  console.log('data', data)
  const [columns, setColumns] = useState(data)

  return (
    <div className="flex pt-16 w-full overflow-x-scroll overflow-y-hidden">
      <KanbanBoard
        columns={columns}
        setColumns={setColumns}
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
