import type { FC } from 'react'
import { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { Box } from 'grommet'
import { CARD } from './ItemTypes'
import { Col } from '../View'
import Paragraph from '../Paragraph'

export type CardProps = {
  title: string
  add?: boolean
  name: string
  type: string
  isDropped?: boolean
}

const limit = (string:string, limit:number) => {
  if (string.length < limit) return string
  return (string.substring(0, limit) + "...")
}

export const Card: FC<CardProps> = memo(function Card({ title, add, name, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "CARD",
      item: { name: "CARD" },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [name, type],
  )


  const background = add ? 'greyE2' : 'white'
  return (
    <Box
      ref={drag}
      margin={{ bottom: 'medium' }}
      border={{ size: 'xsmall', color: 'greyE2' }}
      round="small"
      pad={{ horizontal: 'small' }}
      width={{ min: '220', max: '220px' }}
      background={background}
      onClick={()=>alert('hi')}
    >
      <b>
        <Paragraph>{limit(title, 24)}</Paragraph>
      </b>
    </Box>
  )
})

export default Card
