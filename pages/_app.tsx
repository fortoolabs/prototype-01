import type { AppProps } from 'next/app'
import { Grommet } from 'grommet'
import { theme } from '../styles/formation-theme'

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <Grommet theme={theme} background="white" full>
      <Component {...pageProps} />
    </Grommet>
  )
}

export default MyApp
