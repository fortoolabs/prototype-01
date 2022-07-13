import React from 'react'
import { Box } from 'grommet'

export const Row = props => <Box direction="row" {...props} />
export const Col = props => <Box direction="column" {...props} />

export const AppContainer = props => {
  return (
    <Col
      flex={1}
      width={{ max: '1366px' }}
      height={{ min: '100%' }}
      alignSelf="center"
      background="white"
      overflow="hidden"
      fill
      style={{ position: 'relative', width: '100%', zIndex: 1 }} // to fit absolute header inside. default width 100%
      {...props}
    />
  )
}

export const Main = props => {
  return (
    <Col
      as="main"
      align="stretch" // stretch items perpendicular to main axis
      justify="start"
      flex="grow"
      overflow="hidden"
      {...props}
    />
  )
}

export const MainContent = props => {
  return (
    <Col
      as="main"
      justify="start"
      flex="grow"
      pad="medium"
      {...props}
    />
  )
}

