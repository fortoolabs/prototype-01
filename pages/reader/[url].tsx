import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import base64url from 'base64url'

import parse, { FDocument } from '../../core/parser'

import Heading from '../../components/Heading'
import Board from '../../components/Board'
import List from '../../components/List'
import { AppContainer, Main, MainContent, Row } from '../../components/View'

type ReaderProps = {
  url?: string
  doc?: FDocument
  isFailing: boolean
}

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => parse(t))

const useDoc = (
  url: string,
  { doc }: ReaderProps,
): [ReaderProps, boolean, Error | undefined] => {
  const { data, error, isValidating } = useSWR(url, fetcher, {
    fallbackData: doc,
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
  console.log('props')
  console.log(props)
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
export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{
  props: ReaderProps
}> => {
  if (context.query.url === undefined) {
    // TODO: redirect back to URL input
    return {
      props: {
        isFailing: true,
      },
    }
  }

  const id = (id: string | string[]) => id
  const concat = (acc: string, x: string) => acc.concat(x)
  const x = [context.query.url].flatMap(id).reduce(concat, '')
  const url = base64url.decode(x)

  const props: ReaderProps = await fetcher(url)
    .then((ast) => ({
      url,
      doc: ast,
      isFailing: false,
    }))
    .catch((err) => ({
      url,
      doc: parse(''),
      isFailing: true,
    }))

  // Pass data to the page via props
  return { props }
}

export default Reader
