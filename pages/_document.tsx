import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

function TailwindDocument() {
  return (
    <Html className="h-full">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        {/* serif font Roboto serif */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap"
          rel="stylesheet"
        />

        {/* sans-serif font Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
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
