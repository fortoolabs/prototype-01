import type { AppProps } from 'next/app'
import Script from 'next/script'

import { useEffect, useState } from 'react'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isDark, setDarkMode] = useState(false)
  const [twimojiLoaded, setTwimojiLoaded] = useState(false)

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
  }, [isDark])

  return (
    // TODO: Expose this to the children such that they can control dark-mode settings
    <>
      {/* @david this uses the opensource twitter emoji project please take a a look at https://twemoji.twitter.com/ for Licensing */}
      <Script
        src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
        crossOrigin="anonymous"
        onLoad={() => setTwimojiLoaded(true)}
      />
      {twimojiLoaded && (
        <Script id="parse-page">{`twemoji.parse(document.body)`}</Script>
      )}
      <Component
        className="bg-white dark:bg-black dark:text-white"
        {...pageProps}
        setDarkMode={setDarkMode}
        isDark={isDark}
      />
      <style jsx global>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default MyApp
