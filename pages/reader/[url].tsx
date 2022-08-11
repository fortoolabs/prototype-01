import { NextPage, GetServerSideProps } from 'next'
import { useState } from 'react'
import useSWR from 'swr'

import Board from 'components/Board'
import List from 'components/Linear'
import { Row } from 'components/View'

import { FDocument } from 'core/types'

import { getDoc } from 'pages/api/doc/index'

// TODO: DRY this up by unifying with DocResponse
type ReaderProps = {
  url?: string
  handle?: string
  doc?: FDocument
  isFailing: boolean
  reason?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const useDoc = (
  url: string,
  init: ReaderProps,
): [ReaderProps, boolean, Error | undefined] => {
  const { data, error, isValidating } = useSWR(url, fetcher, {
    fallbackData: init,
  })

  return [
    {
      url,
      doc: data,
      isFailing: error ? true : false,
    },
    isValidating,
    error,
  ]
}

const Reader: NextPage<ReaderProps> = (props) => {
  const [{ url, doc, isFailing }, isLoading, error] = useDoc(
    `/api/doc/${props.handle}`,
    props,
  )

  if (error) {
    // TODO: Figure out what to do.
    console.error(error)
    return <span>Failed to load</span>
  }

  if (doc === undefined) {
    // TODO: Implement empty loading views
    return <span>Loading</span>
  }

  const [boardView, setBoardView] = useState(false)

  return (
    <>
      <Row align="center" gap="medium" justify="end" pad="medium">
        <pre>
          🤔
          {isLoading ? '⏳' : ''}
          {isFailing ? '💥' : ''}
        </pre>
        <span onClick={() => setBoardView(false)}>list</span>
        <span onClick={() => setBoardView(true)}>board</span>
      </Row>
      {boardView ? <Board doc={doc} /> : <List />}
    </>
  )
}

// This gets called on every request
// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<{
  props: ReaderProps
}> => {
  const [status, payload] = await getDoc(query.url)
  return {
    props: {
      ...payload,
      isFailing: status !== 200,
    },
  }
}

export default Reader
