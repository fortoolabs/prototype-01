import { memo } from 'react'
import { useDrag } from 'react-dnd';

import { Col } from '../View'
import Paragraph from '../Paragraph'

export type BoardCardProps = {
  title: string
  add?: boolean
}

const BoardCard = ({ title, add }:BoardCardProps) => {
  // Drag and drop functionality
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { name: "card" },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [],
  )


  const background = add ? 'greyE2' : 'white'
  return (
    <Col
      ref={drag}
      margin={{ bottom: 'medium' }}
      border={{ size: 'xsmall', color: 'greyE2' }}
      round="small"
      pad={{ horizontal: 'small' }}
      width={{ min: '220', max: '220px' }}
      background={background}
    >
      <b>
        <Paragraph>{title}</Paragraph>
      </b>
      {/*    <Paragraph>{description}</Paragraph>
       */}
    </Col>
  )
}

export default BoardCard
