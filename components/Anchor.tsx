import { ArrowTopRightOnSquareIcon as ExternalIcon } from '@heroicons/react/20/solid'

export type AnchorProps = {
  url: string
  label: string | JSX.Element[]
  externalLink?: boolean
  [x: string]: any
}

// TODO: Generalize text-COLOR-VAL and hover:text-COLOR-VAL
export default function Anchor({
  url,
  label,
  externalLink,
  ...props
}: AnchorProps) {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      className={[
        'transition-colors',
        'hover:text-blue-700',
        'inline-flex',
        'items-center',
        'rounded',
        'border',
        'border-gray-300',
        'bg-white',
        'px-2.5',
        'font-medium',
        'text-gray-700',
        'shadow-sm',
        'hover:bg-gray-50',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-indigo-500',
        'focus:ring-offset-2',
      ].join(' ')}
      href={url}
      target={externalLink ? '_blank' : ''}
      rel={externalLink ? 'noopener noreferrer' : ''}
      {...props}
    >
      {label}
      {externalLink && (
        <ExternalIcon className="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
      )}
    </a>
  )
}
