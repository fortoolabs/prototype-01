import { useState } from 'react'

import { FDocument } from 'core/types'

import KanbanBoard from './Board'
import KanbanAddTaskModal from './AddTaskModal'
import KanbanEditTaskModal from './EditTaskModal'

// TODO: Remove when addressing the next (state) TODO
import { columnsFromBackend } from './data'

import { v4 as uuidv4 } from 'uuid'
import parse, { extractHeadlines } from 'core/parser'

// Extraction of Kanban data is component-specific so it belongs in the component implementation
function extractKanbanData({ todoStates, content }: FDocument) {
  // TODO: Source default states from settings
  const defaultStates = ['TODO', 'DONE']

  const docStates = todoStates.length === 0 ? defaultStates : todoStates

  const headlines = extractHeadlines(content, 1)

  return docStates.reduce(
    (acc, state, idx) => ({
      ...acc,

      // Populate workflow state structure
      [state]: {
        title: state,
        tasks: headlines
          .filter((entry) => entry.heading.todoKeyword === state)
          .map((entry) => ({
            // TODO: Abstract id generation into dedicated function
            id: entry.plaintext
              .replace(/\s+/, '-')
              .replace(/[^0-9a-z-]/i, '')
              .toLowerCase(),
            columnId: state,
            name: entry.plaintext,

            // TODO: Add title containing entry.text :: FObjectType[]
            description: '', // TODO: Convert to FObjectType[] and list non-heading section content
            completed: false,
            daysLeft: 0, // TODO: Make optional
            members: [],
          })),
      },
    }),
    {},
  )
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('extracts columns structure from a listing of todos', () => {
    const x = extractKanbanData(
      parse(
        [
          '#+TITLE: Just a test doc',
          '* DONE Stub function',
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
          "tasks": [],
          "title": "TODO",
        },
      }
    `)
  })
}

export default function KanbanSpace({ doc }: { doc: FDocument }) {
  const [isEdit, setEdit] = useState(false)
  const [isAdd, setAdd] = useState(false)

  // TODO: Compute this from doc.todoStates and doc.content
  console.log('Use or lose doc', doc)
  const [columns, setColumns] = useState(columnsFromBackend)

  return (
    <div className="flex pt-16 w-full overflow-x-scroll overflow-y-hidden bg-gray-50 dark:bg-gray-900">
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
