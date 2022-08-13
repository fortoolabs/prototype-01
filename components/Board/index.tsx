import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BoardColumn from './Column'

import { Row } from 'components/View'

import { FDocument } from 'core/types'

export type BoardProps = {
  // TODO: Revert to make this mandatory, optional doc is a hack to move this forward
  doc?: FDocument
}

export default function Board({ doc }: BoardProps) {
  // TODO: fix lack of padding on right side when overflow-x
  // TODO: consider data flow. json -> select todos -> pass to column
  if (doc === undefined) {
    // TODO: Implement empty board view
    return <span>noop</span>
  }

  const { todoStates } = doc
  return (
    <DndProvider backend={HTML5Backend}>
      <Row flex="grow" gap="medium" justify="start" pad="medium" align="start">
        {todoStates.map((state, i) => (
          // TODO: Drill todos down to BoardColumn
          <BoardColumn key={i} title={state} todos={[]} />
        ))}
      </Row>
    </DndProvider>
  )
}
