import type { AppProps } from 'next/app'
import { Grommet } from 'grommet'
import { useState } from 'react'
import styled from 'styled-components'

import { Col, Row } from '../components/View'
import { theme } from '../styles/formation-theme'
import GlobalStyle from '../styles/global'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <Grommet themeMode={darkMode ? 'dark' : 'light'} theme={theme} full>
      <Row gap="4px" pad="small" justify="start">
        <Col
          border={{ size: 'small', color: 'black' }}
          background="black"
          width="24px"
          height="24px"
          round="12px"
          onClick={() => setDarkMode(true)}
        />
        <Col
          border={{ color: 'brand', size: 'small' }}
          background="white"
          width="24px"
          height="24px"
          round="12px"
          onClick={() => setDarkMode(false)}
        />
      </Row>
      <GlobalStyle />
      <Col height={{ min: '100%' }}>
        <Component {...pageProps} />
      </Col>
    </Grommet>
  )
}

export default MyApp
