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
        ' group',
        'relative',
        // TODO: Figure out how to either
        // 1: display ellipsis
        // 2. display an overlay that presents the full text
        // 3. truncate the link in the middle for readability
        // 4. marquee the text on hover or
      ].join(' ')}
      href={url}
      target={isExternal ? '_blank' : ''}
      rel={isExternal ? 'noopener noreferrer' : ''}
    >
      {getIcon(linkType)}

      <span className="block truncate">{isLabelShowable ? label : url}</span>
      <span
        className={[
          'absolute',
          'hidden',
          'group-hover:flex',
          'left-[2px]',
          'top-[1px]',
          'translate-y-full',
          'px-2',
          'py-1',
          'bg-gray-700',
          'rounded-lg',
          'text-center',
          'text-white',
          'text-sm',
          "before:content-['']",
          'before:absolute',
          'before:left-1/2',
          'before:bottom-[95%]',
          'before:-translate-x-1/2',
          'before:border-8',
          'before:border-x-transparent',
          'before:border-t-transparent',
          'before:border-b-gray-700',
        ].join(' ')}
      >
        {isLabelShowable ? label : url}
      </span>

      {false && (
        <ExternalIcon className="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
      )}
    </a>
  )
}
