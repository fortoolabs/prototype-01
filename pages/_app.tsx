import type { AppProps } from 'next/app'
import { Grommet } from 'grommet'
import styled from 'styled-components'

import { Col } from '../components/View'
import { theme } from '../styles/formation-theme'
import GlobalStyle from '../styles/global'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Grommet theme={theme} background="white" full>
    <GlobalStyle/>
      <Col>
        <Component {...pageProps} />
      </Col>
    </Grommet>
  )
}

export default MyApp
