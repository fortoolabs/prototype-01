import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

function TailwindDocument() {
  return (
    <Html className="h-full">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
        <Script
          defer
          src="/js/script.js"
          strategy="afterInteractive"
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        />
      </body>
    </Html>
  )
}

export default TailwindDocument
