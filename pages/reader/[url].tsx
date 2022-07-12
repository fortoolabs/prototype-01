import { useRouter } from 'next/router'
import base64url from "base64url";

interface ReaderProps {
  url: string
}

const Reader = ({ url }: ReaderProps) => {

  return (
    <>
      <h1>Read this uri: {base64url.decode(url)}</h1>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  const url = context.query.url

  // TODO: parse .org 

  // Pass data to the page via props
  return { props: { url: url } }
}

export default Reader
