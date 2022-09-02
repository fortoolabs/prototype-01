import { renderElement } from 'core/renderer'

import { FDocument } from 'core/types'

import { HomeIcon } from '@heroicons/react/20/solid'
import { LightBulbIcon } from '@heroicons/react/24/outline'

// TODO: Migrate Breadcrumb out
type BreadcrumbsProp = {
  pages: {
    name: string
    target: string
    current: boolean
  }[]
}
function Breadcrumbs({ pages }: BreadcrumbsProp) {
  return (
    <nav
      className="flex border-b border-gray-200 bg-white"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className={[
          'mx-auto flex w-full max-w-screen-xl',
          'space-x-4',
          'px-4',
          'sm:px-6 lg:px-4',
        ].join('')}
      >
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <a
                href={page.target}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export type LinearProps = {
  doc: FDocument
  // TODO: Remove in preference of theming (as outlined below)
  serif?: boolean
}

export default function Linear({ serif, doc }: LinearProps) {
  // TODO: Explore using a theming context/provider
  // https://reactician.com/articles/sharing-state-between-nextjs-page-navigations-using-react-contexts
  const { content, title } = doc

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
        serif ? 'font-serif' : 'font-sans',
        //'font-mono',
        'text-base max-w-prose',
      ].join('')}
    >
      <Breadcrumbs pages={[]} />
      {content.length} {title}
      {/* iterate over json, build right component */}
      {content.flatMap((el, i) => renderElement(el, i))}
    </div>
  )
}
