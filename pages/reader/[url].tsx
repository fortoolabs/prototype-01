import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'

import Board from 'components/Board'
import Prose from 'components/mode/Prose'
import { AppContainer, Row, Col } from 'components/View'
import TOC from 'components/app/TOC'
import NavigationBar from 'components/app/NavigationBar'
import SideBar from 'components/app/SideBar'
import PaneBar from 'components/app/PaneBar'

import { FDocument } from 'core/types'
import { extractNestedHeadlines } from 'core/parser'

import { getDoc, DocResponse } from 'pages/api/doc/index'

// TODO: DRY this up by unifying with DocResponse
type ReaderProps = {
  url?: string
  handle: string
  doc?: FDocument
  isFailing: boolean
  reason?: string
  isDark?: boolean | undefined
  setDarkMode?: any
}

// TODO: Implement a failure mode when redirected (status 302)
// Following URL will not redirect (because the repo is open):
//   https://raw.githubusercontent.com/formation-tools/product/main/Roadmap.org
// Following URL will redirect (because repo is private and auth is required):
//   https://gitlab.com/formation.tools/intel/product-vision/-/raw/main/Roadmap.org

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
  const [serif, setSerif] = useState(false)
  const [boardView, setBoardView] = useState(false)

  console.log('myprops,', props)
  const [{ doc, isFailing }, isLoading, error] = useDoc(props.handle, props.doc)

  if (error) {
    // TODO: Figure out what to do.
    console.error('Error in Reader', error)
    return <span>Failed to load</span>
  }

  if (doc === undefined) {
    // TODO: Implement empty loading views
    return <span>Loading</span>
  }

  const { title, content } = doc

  return (
    <AppContainer>
      <NavigationBar
        serif={serif}
        setSerif={setSerif}
        isDark={props.isDark || false}
        setDarkMode={props.setDarkMode}
      />
      <PaneBar
        isLoading={isLoading}
        isFailing={isFailing}
        boardView={boardView}
        setBoardView={setBoardView}
      />
      <Row>
        <SideBar>
          <TOC headings={extractNestedHeadlines(content)} />
        </SideBar>
        <Col fill>
          {boardView ? (
            <Board doc={doc} />
          ) : (
            <Prose isSerif={serif} doc={doc} />
          )}
        </Col>
      </Row>
      {title !== undefined && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
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
    throw new Error('Undefined query.url')
  }

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
