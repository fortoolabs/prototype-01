import type { AppProps } from 'next/app'
import { Grommet } from 'grommet'
import { useState } from 'react'
import styled from 'styled-components'

import { Col } from '../components/View'
import { theme } from '../styles/formation-theme'
import GlobalStyle from '../styles/global'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <Grommet themeMode={darkMode ? 'dark' : 'light'} theme={theme} full>
      <div>
        <span onClick={() => setDarkMode(true)}>dark</span>
        <span onClick={() => setDarkMode(false)}>light</span>
      </div>
      <GlobalStyle />
      <Col height={{ min: '100%' }}>
        <Component {...pageProps} />
      </Col>
    </Grommet>
  )
}

export default MyApp
