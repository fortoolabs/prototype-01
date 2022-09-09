import { NextPage, GetServerSideProps } from 'next'

import { getDoc } from 'pages/api/doc/index'
import { FDocument } from 'core/parser'
import { HomePage } from '../'

type ReaderProps = {
  url?: string
  handle: string
  doc?: FDocument
  isFailing: boolean
  reason?: string
}

// TODO: Implement a failure mode when redirected (status 302)
// Following URL will not redirect (because the repo is open):
//   https://raw.githubusercontent.com/formation-tools/product/main/Roadmap.org
// Following URL will redirect (because repo is private and auth is required):
//   https://gitlab.com/formation.tools/intel/product-vision/-/raw/main/Roadmap.org

const Reader: NextPage<ReaderProps> = (props) => {
  return <HomePage {...props} />
}

// This gets called on every request
// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<{
  props: ReaderProps
}> => {
  // TODO: DRY this up. Copied from pages/index.tsx 😰 for now
  console.log('url', query.url)

  const [status, payload] = await getDoc(query.url)
  const { handle } = payload

  if (handle === undefined) {
    throw new Error('Handle-less document')
  }

  return {
    props: {
      ...payload,
      handle,
      isFailing: status !== 200,
    },
  }
}

export default Reader
