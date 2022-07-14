import { Col, Row } from './View'

export type BoardProps = {
  url?: string
}

export default function Board({ url }: BoardProps) {
  return (
    <Row flex="grow" gap="medium" background="brand" justify="around" pad="medium">
      <Col>Hello column</Col>
      <Col>Hello column</Col>
      <Col>Hello column</Col>
      <Col>Hello column</Col>
    </Row>
  )
}
