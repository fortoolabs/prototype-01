import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'

import Board from 'components/Board'
import Linear from 'components/Linear'
import { AppContainer, Row } from 'components/View'

import { FDocument } from 'core/types'

import { getDoc, DocResponse } from 'pages/api/doc/index'

// TODO: DRY this up by unifying with DocResponse
type ReaderProps = {
  url?: string
  handle: string
  doc?: FDocument
  isFailing: boolean
  reason?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const useDoc = (
  handle: string,
  init?: FDocument,
): [ReaderProps, boolean, Error | undefined] => {
  const url = `/api/doc/${handle}`
  const { data, error, isValidating } = useSWR<DocResponse>(url, fetcher, {
    fallbackData: { doc: init },
  })

  return [
    {
      url,
      handle,
      doc: data && data.doc,
      isFailing: error ? true : false,
    },
    isValidating,
    error,
  ]
}

const Reader: NextPage<ReaderProps> = (props) => {
  const [boardView, setBoardView] = useState(false)
  const [serif, setSerif] = useState(false)

  console.log('Passing props', props)

  const [{ doc, isFailing }, isLoading, error] = useDoc(props.handle, props.doc)

  if (error) {
    // TODO: Figure out what to do.
    console.error(error)
    return <span>Failed to load</span>
  }

  if (doc === undefined) {
    // TODO: Implement empty loading views
    return <span>Loading</span>
  }

  const { title } = doc
  console.log('Passing doc', doc)

  return (
    <AppContainer>
      <Row align="center" gap="medium" justify="end" pad="medium">
        <pre>
          🤔
          {isLoading ? '⏳' : ''}
          {isFailing ? '💥' : ''}
        </pre>
        <button onClick={() => setBoardView(!boardView)}>toggle view</button>
        <button onClick={() => setSerif(!serif)}>toggle font</button>
      </Row>
      {title !== undefined && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      {boardView ? <Board doc={doc} /> : <Linear serif={serif} doc={doc} />}
    </AppContainer>
  )
}

// This gets called on every request
// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<{
  props: ReaderProps
}> => {
  if (query.url === undefined) {
    console.error('Undefined query.url')
    throw new Error('Undefined query.url')
  }

  const [status, payload] = await getDoc(query.url)
  const { handle } = payload

  if (handle === undefined) {
    console.error('Undefined handle')
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
