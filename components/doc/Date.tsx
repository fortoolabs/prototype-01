import { CalendarIcon, ClockIcon } from '@heroicons/react/20/solid'
import { formatDate, formatTime } from 'utils/time'

export type DateProps = {
  timestamp: number
  as: 'time' | 'date'
}

export default function Date({ timestamp, as }: DateProps) {
  const iconArgs = {
    className: 'shrink-0 h-4 w-4',
    'aria-hidden': true,
  }

  // TODO: @tijan let's spar on how we can share common styles between
  // components.
  // During merge, I tweaked this component to be more in line with
  // the styling of the Link and Fallback components and then realized that
  // we're repeating outselves quite a bit to get the classNames right for the
  // different components.
  // Things like backgrounds, drop-shadows, paddings and justification/alignment
  // should be shared across all components such that we can change the
  // look-and-feel in one place and see it applied uniformly. We therefore need
  // to think of an architecture/design that is more scalable.
  // Let's spar about this or feel free to propose design candidates. According
  // to https://tailwindcss.com/docs/reusing-styles, my undestanding is that
  // abstracting the shared styling into a separate components, perhaps
  // InlineElement and BlockElement, will allow all of our components to share
  // some common styling by composing/wrapping them as
  // <InlineElement>{children}</InlineElement>.
  return (
    <time
      className={[
        'inline-block',
        'inline-flex',
        'items-center',
        'gap-1',
        'bg-gray-50',
        'border border-gray-300',
        'py-[2px]',
        'px-1.5',
        'rounded-md',
        'text-gray-700',
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
