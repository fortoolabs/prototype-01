import { Calendar } from 'grommet-icons'

import { Row } from 'components/View'

import { formatDate } from 'utils/time'

export type DateProps = {
  timestamp: number
}

export default function Date({ timestamp }: DateProps) {
  return (
    <Row
      round="xlarge"
      border={{ size: 'small' }}
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
