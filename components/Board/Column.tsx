import { Col } from '../View'
import Heading from '../Heading'
import Card from './Card'

const BoardColumn = ({title, todos}) => {
  return (
    <Col round="small" pad={{horizontal:"medium"}} width={{min:"252px", max:"252px"}} background="lightBlueGrey">
    <Heading level={6} title={title.toUpperCase()}></Heading>
    {todos.map(todo => <Card title={todo.data.title} />)}
    <Card add title="+ Todo" />
  </Col>)
}

export default BoardColumn
