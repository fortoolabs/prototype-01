// https://tailwindui.com/components/application-ui/forms/toggles#component-bcaf782196186836b6ea686e7096e734
// Icons from https://heroicons.com/
export type ToggleDarkModeProps = {
  isDark: boolean
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setDarkMode: (params: boolean) => any
}

export default function ToggleDarkMode({
  isDark,
  setDarkMode,
}: ToggleDarkModeProps): JSX.Element {
  return (
    <button
      type="button"
      className={
        // Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200"
        (isDark ? 'bg-indigo-600' : 'bg-gray-200') +
        ' relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      }
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle Dark Mode"
      onClick={() => setDarkMode(!isDark)}
    >
      <span className="sr-only">Show in dark mode</span>
      <span
        className={
          // Enabled: "translate-x-5", Not Enabled: "translate-x-0"
          (isDark ? 'translate-x-5' : 'translate-x-0') +
          ' pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        }
      >
        <span
          className={
            // Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200"
            (isDark
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200') +
            ' absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          }
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
        <span
          className={
            // Enabled: "opacity-100 ease-in duration-200", Not Enabled: "opacity-0 ease-out duration-100"
            (isDark
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100') +
            ' absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          }
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
      </span>
    </button>
  )
}
