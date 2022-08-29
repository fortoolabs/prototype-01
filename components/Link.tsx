import {
  GlobeAltIcon as WebIcon,
  PaperClipIcon as FileIcon,
  ArrowTopRightOnSquareIcon as ExternalIcon,
} from '@heroicons/react/20/solid'

export type LinkProps = {
  url: string
  linkType: string
  label: string | JSX.Element[]
}

// TODO: Generalize text-COLOR-VAL and hover:text-COLOR-VAL
export default function Link({ url, linkType, label }: LinkProps) {
  const getExternalFlag = (t: string): boolean => {
    switch (t) {
      case 'http':
      case 'https':
      case 'file':
        return true
      default:
        return false
    }
  }

  const isExternal = getExternalFlag(linkType)

  const getIcon = (t: string): JSX.Element | null => {
    const sharedClassNames = '-ml-0.5 mr-1 h-4 w-4'
    switch (t) {
      case 'http':
      case 'https':
        return <WebIcon className={sharedClassNames} aria-hidden="true" />
      case 'file':
        return <FileIcon className={sharedClassNames} aria-hidden="true" />
      default:
        return null
    }
  }

  const isLabelShowable = label.length > 0

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      className={[
        'bg-white',
        'border',
        'border-gray-300',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-indigo-500',
        'focus:ring-offset-2',
        'font-medium',
        'hover:bg-gray-50',
        'hover:text-blue-700',
        'inline-block',
        'inline-flex',
        'items-center',
        'max-w-[25ch]',
        'min-w-[2ch]',
        'min-h-[1ch]',
        'px-1.5',
        'rounded',
        'shadow-sm',
        'text-gray-700',
        'transition-colors',
        // TODO: Figure out how to either
        // 1: display ellipsis
        // 2. display an overlay that presents the full text
        // 3. truncate the link in the middle for readability
        // 4. marquee the text on hover or
        'truncate',
      ].join(' ')}
      href={url}
      target={isExternal ? '_blank' : ''}
      rel={isExternal ? 'noopener noreferrer' : ''}
    >
      {getIcon(linkType)}
      {isLabelShowable ? label : url}
      {false && (
        <ExternalIcon className="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
      )}
    </a>
  )
}
