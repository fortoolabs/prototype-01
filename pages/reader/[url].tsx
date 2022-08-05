import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import base64url from 'base64url'

import parse, { FDocument } from '../../core/parser'

import Heading from '../../components/Heading'
import Board from '../../components/Board'
import List from '../../components/List'
import { AppContainer, Main, MainContent, Row } from '../../components/View'

interface ReaderProps {
  url: string
  doc: FDocument | undefined
  isLoading: boolean
  isFailing: Error | undefined
}

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => parse(t))

const useDoc = (url: string): ReaderProps => {
  const { data, error, isValidating } = useSWR(url, fetcher)

  return {
    url,
    doc: data,
    isLoading: isValidating,
    isFailing: error,
  }
}

const Reader = (init: ReaderProps) => {
  const { url, doc, isLoading, isFailing }: ReaderProps = useDoc(init.url)
  const [boardView, setBoardView] = useState(false)

  return (
    <>
      <Row align="center" gap="medium" justify="end" pad="medium">
        <Heading level={3} title={url} />
        <pre>
          {isLoading ? '⏳' : ''}
          {isFailing ? '💥' : ''}
        </pre>
        <span onClick={() => setBoardView(false)}>list</span>
        <span onClick={() => setBoardView(true)}>board</span>
      </Row>
      {boardView ? <Board /> : <List />}
    </>
  )
}

// This gets called on every request
const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{ props: ReaderProps }> => {
  if (context.query.url === undefined) {
    // TODO: redirect back to URL input
    return {
      props: {
        url: 'https://dummy.example.com',
        doc: parse(''),
        isLoading: false,
        isFailing: new Error('Invalid URL'),
      },
    }
  }

  const id = (id: string | string[]) => id
  const concat = (acc: string[], x: string) => acc.concat(x)
  //const x = [context.query.url].flatMap(id).reduce(concat, '')
  // TODO: Remove hardcoded url and get line above to work
  const x =
    'https://gitlab.com/formation.tools/intel/product-vision/-/raw/main/Roadmap.org'
  const url = base64url.decode(x)

  const props: ReaderProps = await fetcher(url)
    .then((ast) => ({
      url,
      doc: ast,
      isLoading: false,
      isFailing: undefined,
    }))
    .catch((err) => ({
      url,
      doc: parse(''),
      isLoading: false,
      isFailing: err,
    }))

  // Pass data to the page via props
  return { props }
}

export default Reader
