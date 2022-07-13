import { useRouter } from 'next/router'
import base64url from "base64url";
import { AppContainer, Main, MainContent } from '../../components/View'

interface ReaderProps {
  url: string
}

const Reader = ({ url }: ReaderProps) => {
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

// This gets called on every request
export async function getServerSideProps(context: any) {
  const url = context.query.url

  // TODO: parse .org

  // Pass data to the page via props
  return { props: { url: url } }
}

export default Reader
