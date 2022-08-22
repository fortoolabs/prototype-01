import type { AppProps } from 'next/app'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'

import '../styles/globals.css'

import ToggleDarkMode from 'components/ToggleDarkMode'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isDark, setDarkMode] = useState(false)

  useEffect(() => {
    // Check window and document existentce to limit logic to the client-side
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
      if (
        isDark === true ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  })

  return (
    // TODO: Expose this to the children such that they can control dark-mode settings
    <div className="bg-white dark:bg-black dark:text-white">
      <ToggleDarkMode
        isEnabled={isDark}
        setEnabled={setDarkMode}
        icons={{ enabled: <SunIcon />, disabled: <MoonIcon /> }}
      />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
