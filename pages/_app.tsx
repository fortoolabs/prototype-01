import type { AppProps } from 'next/app'
import { Grommet } from 'grommet'
import FormationTheme from '../styles/formation-theme.json'

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      almostBlack: '#1A1C1F',
      white: "#ffffff"
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
} 

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <Grommet theme={FormationTheme} background="white" full>
      <Component {...pageProps} />
    </Grommet>
  )
}

export default MyApp
