import { formatDate } from '../utils/time'
import Paragraph from './Paragraph'

export type DateProps = {
  timestamp: number
}

export default function Date({ timestamp }: DateProps) {
  return <Paragraph><b>{formatDate(timestamp)}</b></Paragraph>
}
