import { renderElement } from 'core/renderer'

import { FDocument } from 'core/types'

import { LightBulbIcon } from '@heroicons/react/24/outline'

import Breadcrumbs from './Breadcrumbs'
export type LinearProps = {
  doc: FDocument
  // TODO: Remove in preference of theming (as outlined below)
  isSerif?: boolean
}

export default function Prose({ isSerif, doc }: LinearProps) {
  // TODO: Explore using a theming context/provider
  // https://reactician.com/articles/sharing-state-between-nextjs-page-navigations-using-react-contexts
  const { content } = doc

  if (content.length === 0) {
    return (
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <LightBulbIcon
          className="mx-auto h-12 w-12 text-gray-400 stroke-current stroke-1"
          aria-hidden="true"
        />
        <span className="mt-2 block text-sm font-medium text-gray-900">
          Start forming this clean slate with fresh ideas!
        </span>
      </button>
    )
  }

  return (
    <div
      className={[
        'border-2 border-blue-300',
        // TODO: make full-width such that scrollbars show up in correct place
        isSerif ? 'font-robotoSerif' : 'font-inter',
        'text-base max-w-prose',
        'overflow-x-scroll',
        'leading-loose',
        'p-5',
        'md:p-3',
      ].join(' ')}
    >
      {/*<Breadcrumbs pages={[]} />*/}
      {/* iterate over json, build right component */}
      {content.flatMap((el, i) => renderElement(el, `prose-${i}`, doc))}
    </div>
  )
}
