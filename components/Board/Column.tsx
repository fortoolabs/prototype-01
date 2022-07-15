import { Box } from 'grommet'
import { Col } from '../View'
import Heading from '../Heading'
import Paragraph from '../Paragraph'
import Card from './Card'

export type BoardColumnProps = {
  title: string
  todos: any
}

const BoardColumn = ({ title, todos }: BoardColumnProps) => {
  return (
    <Col
      round="small"
      pad={{ horizontal: 'medium' }}
      width={{ min: '252px', max: '252px' }}
      background={{ light: 'lightBlueGrey', dark: 'black28' }}
    >
      <Heading level={6} title={title.toUpperCase()}></Heading>
      {todos.map((todo: any, i: number) => (
        <Card key={i} title={todo.data.title} name={`card-${i}`} type="CARD" />
      ))}
      <Box
        margin={{ bottom: 'medium' }}
        round="small"
        pad={{ horizontal: 'small' }}
        width={{ min: '220', max: '220px' }}
        background={{ light: 'white', dark: 'black' }}
        onClick={() => alert('add todo')}
      >
        <b>
          <Paragraph>+ Todo</Paragraph>
        </b>
      </Box>
    </Col>
  )
}

export default BoardColumn
