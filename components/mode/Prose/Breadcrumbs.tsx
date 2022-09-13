import { HomeIcon } from '@heroicons/react/20/solid'

type BreadcrumbsProp = {
  pages: {
    name: string
    target: string
    current: boolean
  }[]
}

export default function Breadcrumbs({ pages }: BreadcrumbsProp) {
  return (
    <nav aria-label="Breadcrumb" className="hidden md:max-w-[50%]">
      <ol
        role="list"
        className="flex h-8 sm:w-auto space-x-4 border rounded-md bg-white px-6 shadow"
      >
        <li className="flex items-center">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex items-center overflow-hidden">
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <a
              href={page.target}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 truncate"
              aria-current={page.current ? 'page' : undefined}
            >
              {page.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
