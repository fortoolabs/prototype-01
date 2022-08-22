import { Html, Head, Main, NextScript } from 'next/document'

function TailwindDocument() {
  return (
    <Html className="h-full">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default TailwindDocument
