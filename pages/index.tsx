import type { NextPage } from 'next'
import useSWR, { Fetcher } from 'swr'

import { AppContainer, Main, MainContent } from '../components/View'

// Dummy API call
import type { HelloData } from './api/hello'

const fetcher: Fetcher<HelloData, string> = (url) =>
  fetch(url).then((r) => r.json())

type HelloResponse = {
  hello: string
  isLoading: boolean
  isError: Error
}

function validName(data: HelloData | undefined): string {
  console.log('validName', data, data == undefined)
  if (data == undefined) {
    return 'that which should not be named'
  }
  return data.name
}

function useHello(): HelloResponse {
  const { data, error } = useSWR('/api/hello', fetcher)

  return {
    hello: validName(data),
    isLoading: !error && !data,
    isError: error,
  }
}

const Home: NextPage = () => {
  const { hello, isLoading }: HelloResponse = useHello()

  return (
    <AppContainer>
      <Main>
        <MainContent>
          <p>
            This is some dynamic content from the api: 👉🏿{' '}
            <strong>{hello}</strong>
            {isLoading && <span>⏳</span>}
          </p>
        </MainContent>
      </Main>
    </AppContainer>
  )
}

export default Home
