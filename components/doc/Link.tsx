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
        // TODO: Treat file links as external when we know how to href
        // Currently it is unclear how to consistently figure out how to map a
        // file link to an absolute URL. It's likely not a hard problem but I just
        // can't be bothered to think about it right now. Just a quick fix to
        // remove broken links at the minimum.
        //case 'file':

        return true
      default:
        return false
    }
  }

  const isExternal = getExternalFlag(linkType)

  const getIcon = (t: string): JSX.Element | null => {
    const sharedClassNames = 'shrink-0 h-4 w-4'
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
  const linkClasses = [
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
    'gap-1',
    'items-center',
    'max-w-[25ch]',
    'min-w-[2ch]',
    'min-h-[1ch]',
    'px-1.5',
    'rounded',
    'shadow-sm',
    'text-gray-700',
    'transition-colors',
    'group',
    'relative',
    // TODO: Figure out how to either
    // 1: display ellipsis
    // 2. display an overlay that presents the full text
    // 3. truncate the link in the middle for readability
    // 4. marquee the text on hover or
  ].join(' ')

  if (isExternal) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        className={linkClasses}
        href={url}
        target={isExternal ? '_blank' : ''}
        rel={isExternal ? 'noopener noreferrer' : ''}
      >
        {getIcon(linkType)}
        <span className="block truncate">{isLabelShowable ? label : url}</span>
        {false && <ExternalIcon className="h-4 w-4" aria-hidden="true" />}
      </a>
    )
  } else {
    return (
      <span className={linkClasses}>
        {getIcon(linkType)}
        <span className="block truncate">{isLabelShowable ? label : url}</span>
      </span>
    )
  }
}
