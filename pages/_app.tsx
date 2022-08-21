import type { AppProps } from 'next/app'

import { useState } from 'react'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false)

  // Check window and document existentce to limit logic to the client-side
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
    if (
      darkMode === true ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
