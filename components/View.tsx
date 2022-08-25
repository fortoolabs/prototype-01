import React from 'react'
import { Box, BoxExtendedProps } from 'grommet'

export const Row = (props: BoxExtendedProps) => (
  <Box direction="row" {...props} />
)
export const Col = (props: BoxExtendedProps) => (
  <Box direction="column" {...props} />
)

export const AppContainer = (props: BoxExtendedProps) => {
  return (
    <Col
      height={{ min: '100%' }}
      alignSelf="center"
      overflow="hidden"
      fill
      style={{ position: 'relative', width: '100%', zIndex: 1 }} // to fit absolute header inside. default width 100%
      {...props}
    />
  )
}

export const Main = (props: BoxExtendedProps) => {
  return (
    <Col
      as="main"
      width={{ max: '780px' }}
      align="stretch" // stretch items perpendicular to main axis
      justify="start"
      flex="grow"
      overflow="hidden"
      {...props}
    />
  )
}

export const MainContent = (props: BoxExtendedProps) => {
  return <Col justify="start" align="start" pad="medium" {...props} />
}
