import { Col, Row } from '../View'
import Column from './Column'

export type BoardProps = {
  url?: string
}

const state = ["idea","todo", "doing", "done"]

export default function Board({ url }: BoardProps) {
  // TODO: fix lack of padding on right side when overflow-x
  return (
    <Row flex="grow" gap="medium" justify="start" pad="medium">
      <Column title={state[0]}>Hello column</Column>
      <Column title={state[1]}>Hello column</Column>
      <Column title={state[2]}>Hello column</Column>
      <Column title={state[3]}>Hello column</Column>
    </Row>
  )
}
