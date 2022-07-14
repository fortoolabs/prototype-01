import { useRouter } from 'next/router'
import { useState } from 'react'
import base64url from 'base64url'

import Heading from '../../components/Heading'
import Board from '../../components/Board'
import { AppContainer, Main, MainContent, Row } from '../../components/View'

interface ReaderProps {
  url: string
}

const _ListView = ({ url }: ReaderProps) => {
  return (
    <AppContainer>
      <Main>
        <MainContent>
          <h1>Read this url: {base64url.decode(url)}</h1>
        </MainContent>
      </Main>
    </AppContainer>
  )
}

const Reader = ({ url }: ReaderProps) => {
  const [boardView, setBoardView] = useState(true)

  return (
    <>
      <Row align="center" gap="medium" justify="end" pad="medium">
        <Heading level={3} title={base64url.decode(url)}/>
        <span onClick={() => setBoardView(false)}>list</span>
        <span onClick={() => setBoardView(true)}>board</span>
      </Row>
      {!!boardView ? <Board url={url} /> : <_ListView url={url} />}
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const url = context.query.url

  // TODO: parse .org

  // Pass data to the page via props
  return { props: { url: url } }
}

export default Reader
