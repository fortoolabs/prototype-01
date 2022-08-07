import { NextPage, GetServerSideProps } from 'next'
import { useState } from 'react'
import useSWR from 'swr'

import Board from '../../components/Board'
import List from '../../components/List'
import { Row } from '../../components/View'

import { FDocument } from '../../core/parser'

import { getDoc } from '../api/doc/index'

type ReaderProps = {
  url?: string
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
    props.url || '',
    props,
  )

  if (doc === undefined) {
    // TODO: Figure out what to do. Redirect?
  }

  if (error) {
    // TODO: Figure out what to do.
  }

  const [boardView, setBoardView] = useState(false)

  return (
    <>
      <Row align="center" gap="medium" justify="end" pad="medium">
        <pre>
          🤔
          {url}
          {isLoading ? '⏳' : ''}
          {isFailing ? '💥' : ''}
        </pre>
        <span onClick={() => setBoardView(false)}>list</span>
        <span onClick={() => setBoardView(true)}>board</span>
      </Row>
      <Row align="center" gap="medium" justify="end" pad="medium">
        <pre>{JSON.stringify(props)}</pre>
      </Row>
      {boardView ? <Board /> : <List />}
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
