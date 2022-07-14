import { Col } from '../View'
import Heading from '../Heading'
import Card from './Card'

export type BoardColumnProps = {
  title: string
  todos: any
}

const BoardColumn = ({title, todos}:BoardColumnProps) => {
  return (
    <Col round="small" pad={{horizontal:"medium"}} width={{min:"252px", max:"252px"}} background="lightBlueGrey">
    <Heading level={6} title={title.toUpperCase()}></Heading>
    {todos.map((todo:any, i:number) => <Card key={i} title={todo.data.title} />)}
    <Card add title="+ Todo" />
  </Col>)
}

export default BoardColumn
