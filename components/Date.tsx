import { CalendarIcon, ClockIcon } from '@heroicons/react/20/solid'
import { formatDate, formatTime } from 'utils/time'

export type DateProps = {
  timestamp: number
  as: 'time' | 'date'
  iconFill?: 'blue' | 'green' | 'indigo' | 'purple' | 'gray'
}

const fill = {
  gray: 'fill-gray-600',
  blue: 'fill-blue-600',
  green: 'fill-green-600',
  indigo: 'fill-indigo-600',
  purple: 'fill-purple-600',
}

export default function Date({ timestamp, as, iconFill }: DateProps) {
  const iconArgs = {
    className: '-ml-0.5 mr-1 h-4 w-4',
    'aria-hidden': true,
  }

  return (
    <time
      className={[
        'inline-flex',
        'items-baseline',
        'gap-1',
        'font-semibold',
        'bg-gray-50',
        'border border-gray-300',
        'py-[2px]',
        'px-[3px]',
        'rounded-md',
        'text-sm',
      ].join(' ')}
      dateTime={
        as === 'time'
          ? formatTime(timestamp).datetime
          : formatDate(timestamp).datetime
      }
    >
      {as === 'date' && <CalendarIcon {...iconArgs} />}
      {as === 'time' && <ClockIcon {...iconArgs} />}
      {as === 'date' && formatDate(timestamp).date}
      {as === 'time' && formatTime(timestamp).time}
    </time>
  )
}
