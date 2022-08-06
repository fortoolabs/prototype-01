import { Calendar } from 'grommet-icons'

import { formatDate } from '../utils/time'
import { Row } from './View'

export type DateProps = {
  timestamp: number
}

export default function Date({ timestamp }: DateProps) {
  return (
    <Row
      round="xlarge"
      border={{ width: 'small' }}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      gap="medium"
    >
      <Calendar color="brand" />
      <span>
        <b>{formatDate(timestamp)}</b>
      </span>
    </Row>
  )
}
