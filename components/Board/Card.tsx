import { memo, FC } from 'react'
import { useDrag } from 'react-dnd'

import { Box } from 'grommet'

import { ParagraphSmall } from 'components/Paragraph'

export type CardProps = {
  title: string
  name: string
  type: string
  isDropped?: boolean
}

const limit = (string: string, limit: number) => {
  if (string.length <= limit) return string
  return string.substring(0, limit) + '...'
}

export const Card: FC<CardProps> = memo(function Card({ title, name, type }) {
  const [, drag] = useDrag(
    () => ({
      type: 'CARD',
      item: { name: 'CARD' },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [name, type],
  )

  return (
    <Box
      ref={drag}
      margin={{ bottom: 'small' }}
      border={{ size: 'xsmall', color: { light: 'greyE2', dark: 'black' } }}
      round="4px"
      pad={{ horizontal: 'small' }}
      width={{ min: '220', max: '220px' }}
      background={{ light: 'white', dark: '#707581' }} //TODO: pick darkmode color palette
      onClick={() => alert('Todo details')}
    >
      <b>
        <ParagraphSmall>{limit(title, 48)}</ParagraphSmall>
      </b>
    </Box>
  )
})

export const AddCard: FC = () => {
  return (
    <Box
      margin={{ bottom: 'medium' }}
      round="4px"
      pad={{ horizontal: 'small' }}
      width={{ min: '220', max: '220px' }}
      background={{ light: 'greyE7', dark: 'black' }}
      onClick={() => alert('add todo')}
    >
      <b>
        <ParagraphSmall>+ Add Card</ParagraphSmall>
      </b>
    </Box>
  )
}

export default Card
