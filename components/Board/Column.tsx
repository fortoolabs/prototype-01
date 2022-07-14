import { Col } from '../View'
import Heading from '../Heading'

const BoardColumn = ({title}) => {
  return (
    <Col round="small" pad={{horizontal:"medium"}} width={{min:"252px", max:"252px"}} background="lightBlueGrey">
    <Heading level={6} title={title.toUpperCase()}></Heading>
  </Col>)
}

export default BoardColumn
